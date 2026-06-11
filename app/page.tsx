"use client";

import { useState } from "react";
import { z } from "zod";
import DadosPessoaisSection from "@/components/DadosPessoaisSection";
import EnderecoSection from "@/components/EnderecoSection";
import DadosProfissionaisSection, { VALOR_UPF_ATUAL } from "@/components/DadosProfissionaisSection";
import GuiaContribuinte from "@/components/GuiaContribuinte";

// 1. Tipagem dos Erros (Agora com os Dados Profissionais)
export type FormErrors = {
    nome?: string;
    cpf?: string;
    dataNascimento?: string;
    telefone?: string;
    email?: string;
    endereco?: string;
    bairro?: string;
    cep?: string;
    profissao?: string;
    localPrestacao?: string;
    nivel?: string;
    dataDeclaracao?: string;
};

// 2. Schema de Validação Zod
const formSchema = z.object({
    // Validações dos Dados Pessoais
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    cpf: z.string().min(14, "O CPF deve estar completo (11 dígitos)."),
    dataNascimento: z.string().min(10, "A data de nascimento é obrigatória."),
    telefone: z.string().min(14, "Telefone incompleto."),
    email: z.string().email("Digite um e-mail válido."),

    // Validações do Endereço
    endereco: z.string().min(5, "O endereço completo é obrigatório."),
    bairro: z.string().min(2, "O bairro é obrigatório."),
    cep: z.string().min(9, "O CEP deve estar completo."),

    // Validações dos Dados Profissionais
    profissao: z.string().min(3, "Informe a profissão ou atividade exercida."),
    localPrestacao: z.string().min(5, "Descreva o local de prestação dos serviços."),
    nivel: z.string().min(1, "Selecione o nível de escolaridade."),
    dataDeclaracao: z.string().min(10, "A data da declaração é obrigatória."),
});

export default function DeclaracaoAutonomoPage() {
    // 3. Estados do Formulário
    const [errors, setErrors] = useState<FormErrors>({});

    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    const [dadosPessoais, setDadosPessoais] = useState({
        nome: "",
        cpf: "",
        rg: "",
        dataNascimento: "",
        telefone: "",
        email: "",
    });

    const [dadosEndereco, setDadosEndereco] = useState({
        endereco: "",
        bairro: "",
        cep: "",
    });

    // Pega a data de hoje no formato YYYY-MM-DD para o valor padrão
    const hoje = new Date().toISOString().split('T')[0];

    const [dadosProfissionais, setDadosProfissionais] = useState({
        profissao: "",
        localPrestacao: "",
        nivel: "",
        dataDeclaracao: hoje, // <-- Já inicia com a data atual
    });


    async function generatePdf() {
        setIsGeneratingPdf(true);

        try {
            // Importações dinâmicas forçadas como 'any' para evitar erro do VFS
            const pdfMakeModule = await import("pdfmake/build/pdfmake") as any;
            const pdfFontsModule = await import("pdfmake/build/vfs_fonts") as any;

            // Garantindo que ele pegue o construtor certo independente do empacotador
            const pdfMake = pdfMakeModule.default || pdfMakeModule;
            const pdfFonts = pdfFontsModule.default || pdfFontsModule;

            pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

            // Importa nosso template montador
            const { createDeclaracaoDoc } = await import("@/utils/pdf/pdf-template-declaracao");

            // Empacota os dados para a função
            const formData = { dadosPessoais, dadosEndereco, dadosProfissionais };

            // Força a tipagem 'any' na saída para o TS não reclamar das margens (number[])
            const docDefinition: any = createDeclaracaoDoc(formData, VALOR_UPF_ATUAL);

            // Gera e Baixa o PDF
            pdfMake.createPdf(docDefinition).download(`Declaracao_ISSQN_${dadosPessoais.cpf.replace(/\D/g, '')}.pdf`);

        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Erro ao gerar PDF. Verifique o console para mais detalhes.");
        } finally {
            setIsGeneratingPdf(false);
        }
    }

    // 4. Função de Submissão e Validação
    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = {
            ...dadosPessoais,
            ...dadosEndereco,
            ...dadosProfissionais,
        };

        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.flatten().fieldErrors;
            setErrors(formattedErrors as any);

            // 1. Definimos a ordem exata em que os campos aparecem na tela
            const ordemDosCampos: (keyof FormErrors)[] = [
                "nome", "cpf", "dataNascimento", "telefone", "email", // Dados Pessoais
                "endereco", "bairro", "cep",                                // Endereço
                "profissao", "localPrestacao", "nivel", "dataDeclaracao"    // Dados Profissionais
            ];

            // 2. Encontramos qual é o PRIMEIRO campo da nossa lista que contém um erro
            const primeiroCampoComErro = ordemDosCampos.find(campo =>
                formattedErrors[campo as keyof typeof formattedErrors]
            );

            if (primeiroCampoComErro) {
                // 3. Buscamos o elemento HTML desse campo na tela usando o atributo 'name'
                const elemento = document.querySelector(`[name="${primeiroCampoComErro}"]`) as HTMLElement;

                if (elemento) {
                    // Rola a tela suavemente deixando o campo no centro da visão
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Opcional: Já coloca o cursor piscando dentro do campo para o usuário digitar
                    elemento.focus();
                }
            }

            return;
        }

        setErrors({});
        generatePdf()
        console.log("Formulário válido:", result.data);
    }

    return (
        <div data-search-root className="container mx-auto px-4 py-8 max-w-4xl relative">

            {/* GUIA PRÁTICO / PASSO A PASSO DO CONTRIBUINTE */}
            <GuiaContribuinte />

            {/* --- SOBREPOSIÇÃO DE CARREGAMENTO (LOADING OVERLAY) --- */}
            {isGeneratingPdf && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mb-4"></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Gerando PDF...</h2>
                    <p className="text-gray-200">Aguarde um instante, o download iniciará automaticamente.</p>
                </div>
            )}

            <div id="formulario-declaracao" className="bg-white rounded-lg shadow-lg p-6 md:p-10 border border-gray-200 scroll-mt-6">

                {/* CABEÇALHO */}
                <div className="text-center mb-8">
                    <h4 className="text-pv-green-600 font-bold text-xl md:text-2xl mb-2">
                        DECLARAÇÃO DE EXERCÍCIO DE ATIVIDADE AUTÔNOMA
                    </h4>
                    <h2 className="text-gray-700 font-medium text-lg mb-1">
                        Para fins de lançamento do ISSQN
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Prefeitura Municipal de Porto Velho - Secretaria Municipal de Economia (SEMEC)
                    </p>
                </div>

                <div className="border-t border-gray-300 my-8" />

                {/* FORMULÁRIO */}
                <form onSubmit={handleSubmit}>

                    <DadosPessoaisSection
                        value={dadosPessoais}
                        onChange={setDadosPessoais}
                        errors={errors}
                    />

                    <EnderecoSection
                        value={dadosEndereco}
                        onChange={setDadosEndereco}
                        errors={errors}
                    />

                    {/* Inserção da Secção de Dados Profissionais */}
                    <DadosProfissionaisSection
                        value={dadosProfissionais}
                        onChange={setDadosProfissionais}
                        errors={errors}
                    />

                    {/* AVISO LEGAL SOBRE O PDF */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 mt-8 mb-8 rounded-r-md shadow-sm">
                        <h4 className="text-yellow-800 font-bold text-lg flex items-center gap-2 mb-3">
                            <span>⚠️</span> ATENÇÃO - Sobre a Declaração
                        </h4>

                        <p className="text-yellow-900 text-sm mb-3">
                            <strong>Ao gerar o PDF, você estará produzindo um documento oficial que contém:</strong>
                        </p>

                        <ul className="list-disc list-inside text-yellow-900 text-sm space-y-1.5 ml-2 mb-4">
                            <li><strong>Declaração de exercício de atividade autônoma</strong> no Município de Porto Velho/RO;</li>
                            <li><strong>Enquadramento tributário</strong> conforme seu nível de escolaridade;</li>
                            <li><strong>Reconhecimento da obrigação tributária</strong> do ISSQN;</li>
                            <li><strong>Confissão irrevogável de dívida</strong> para fins de lançamento mensal do imposto;</li>
                            <li><strong>Concordância com procedimentos de cobrança</strong> (multa, juros, inscrição em dívida ativa, protesto e execução fiscal);</li>
                            <li><strong>Declaração de responsabilidade</strong> pela veracidade das informações prestadas;</li>
                            <li><strong>Compromisso</strong> de comunicar qualquer alteração cadastral à SEMFAZ.</li>
                        </ul>

                        <p className="text-yellow-900 text-sm">
                            <strong>Este documento tem validade legal e produzirá efeitos jurídicos!</strong>
                        </p>
                    </div>

                    {/* BOTÃO FINAL DE SUBMISSÃO (Atualizado para o Loading) */}
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            disabled={isGeneratingPdf}
                            className={`bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-md shadow-lg transition flex items-center justify-center gap-2 mx-auto w-full md:w-auto
                                    ${isGeneratingPdf ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {isGeneratingPdf ? "Gerando PDF..." : "Gerar PDF"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
