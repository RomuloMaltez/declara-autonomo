import React from "react";
import { ChevronDown } from "lucide-react";

// ============================================================================
// Guia Prático e Autodidático do Contribuinte
// Roteiro passo a passo para abertura de inscrição de Profissional Autônomo
// (Sistema de ISS Fixo Mensal) — SEMEC / Porto Velho - RO
// ============================================================================

const LINK_GPI =
    "https://gpi-trb.portovelho.ro.gov.br/ServerExec/acessoBase/?idPortal=dbde30ec-cf59-4803-9653-00121a704021";
const EMAIL_PROTOCOLO = "protocolo.semfaz@portovelho.ro.gov.br";

type PassoProps = {
    numero: number;
    titulo: string;
    children: React.ReactNode;
};

function Passo({ numero, titulo, children }: PassoProps) {
    return (
        <div className="flex gap-4">
            <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--pv-green-600)] text-lg font-bold text-white shadow-md"
            >
                {numero}
            </div>
            <div className="flex-1">
                <h5 className="mb-2 text-base font-semibold !text-gray-800 md:text-lg">
                    {titulo}
                </h5>
                <div className="text-sm leading-relaxed text-gray-600 md:text-base">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function GuiaContribuinte() {
    return (
        <section
            className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-10"
            aria-labelledby="guia-titulo"
        >
            {/* CABEÇALHO DO GUIA */}
            <div className="mb-6 text-center">
                <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-800">
                    Passo a Passo
                </span>
                <h2
                    id="guia-titulo"
                    className="mt-3 text-xl font-bold text-[color:var(--pv-blue-900)] md:text-2xl"
                >
                    Guia Prático do Contribuinte
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Inscrição de Cadastro de Profissional Autônomo • Sistema de ISS Fixo
                    Mensal
                </p>
            </div>

            {/* INTRODUÇÃO */}
            <div className="mb-8 space-y-3 text-sm leading-relaxed text-gray-600 md:text-base">
                <p>
                    Com o objetivo de conferir total transparência e celeridade aos atos
                    da Administração Tributária do Município de Porto Velho, apresentamos
                    este roteiro simplificado e autodidático para a abertura de sua
                    inscrição econômica como <strong>Profissional Autônomo</strong>. Este
                    procedimento encontra-se amparado pela{" "}
                    <strong>Lei Complementar nº 878/2021</strong> (Código Tributário de
                    Rendas Municipais) e regulamentado pelo{" "}
                    <strong>Decreto nº 18.749/2023</strong>.
                </p>
                <p>
                    A devida regularização garante o enquadramento no regime de{" "}
                    <strong>ISS Fixo Mensal</strong>, permitindo a emissão de Notas
                    Fiscais de Serviço Eletrônicas (NFS-e) de forma ilimitada, superando
                    as travas sistêmicas de quantidade aplicadas aos cadastros
                    eventuais/esporádicos.
                </p>
            </div>

            {/* ROTEIRO OPERACIONAL — 3 PASSOS */}
            <div className="space-y-8">
                <Passo
                    numero={1}
                    titulo="Preenchimento da Declaração Eletrônica de Atividade"
                >
                    <p className="mb-3">
                        Preencha de forma 100% digital a declaração estruturada logo
                        abaixo nesta página. Ao finalizar, o sistema gerará um arquivo em
                        formato <strong>PDF</strong> que servirá como a sua peça
                        declaratória oficial.
                    </p>
                    <a
                        href="#formulario-declaracao"
                        className="group inline-flex items-center gap-2 rounded-md bg-[color:var(--pv-green-600)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-green-700"
                    >
                        Ir para o formulário
                        <ChevronDown
                            size={18}
                            aria-hidden
                            className="animate-bounce group-hover:animate-none"
                        />
                    </a>
                    <p className="mt-2 text-xs text-gray-500">
                        Dica: confira todos os dados obrigatórios com atenção antes de
                        submeter e gerar o arquivo PDF.
                    </p>
                </Passo>

                <Passo
                    numero={2}
                    titulo="Emissão da Taxa de Abertura de Processo Administrativo"
                >
                    <p className="mb-3">
                        A legislação exige o recolhimento prévio da taxa de expediente
                        padrão da prefeitura para conferir andamento ao seu pedido. Siga o
                        roteiro de emissão:
                    </p>
                    <ol className="mb-3 list-decimal space-y-1.5 pl-5">
                        <li>Acesse o portal de serviços fazendários (link abaixo);</li>
                        <li>
                            Na tela inicial, localize e clique no módulo{" "}
                            <strong>&ldquo;EMISSÃO DE TAXAS WEB&rdquo;</strong>;
                        </li>
                        <li>
                            No campo <strong>&ldquo;Taxa&rdquo;</strong>, digite{" "}
                            <strong>&ldquo;Taxa de Abertura&rdquo;</strong> e selecione a
                            opção correspondente;
                        </li>
                        <li>
                            Insira o <strong>CPF</strong> do contribuinte para puxar os
                            dados, efetue a emissão e realize o pagamento da tarifa
                            bancária.
                        </li>
                    </ol>
                    <a
                        href={LINK_GPI}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-[color:var(--pv-blue-900)] px-4 py-2 text-sm font-semibold text-[color:var(--pv-blue-900)] transition hover:bg-blue-50"
                    >
                        🌐 Portal de Serviços e Emissão de Taxas (GPI)
                    </a>
                </Passo>

                <Passo
                    numero={3}
                    titulo="Organização de Documentos e Envio para o Protocolo"
                >
                    <p className="mb-3">
                        Com a declaração (PDF do Passo 1) e a taxa de abertura quitada
                        (Passo 2), digitalize a documentação de comprovação pessoal e
                        profissional e encaminhe em anexo para o canal oficial da
                        secretaria:
                    </p>
                    <a
                        href={`mailto:${EMAIL_PROTOCOLO}`}
                        className="mb-4 inline-flex items-center gap-2 rounded-md bg-blue-50 px-4 py-2 text-sm font-semibold text-[color:var(--pv-blue-900)] transition hover:bg-blue-100"
                    >
                        📧 {EMAIL_PROTOCOLO}
                    </a>

                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                        <p className="mb-2 text-sm font-semibold text-gray-700">
                            Checklist Obrigatório de Documentos:
                        </p>
                        <ul className="space-y-1.5 text-sm text-gray-600">
                            <li className="flex gap-2">
                                <span className="text-[color:var(--pv-green-600)]">✓</span>
                                Declaração de Exercício de Atividade Autônoma preenchida e
                                assinada (PDF gerado no Passo 1);
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[color:var(--pv-green-600)]">✓</span>
                                Comprovante de pagamento legível da Taxa de Abertura (Passo
                                2);
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[color:var(--pv-green-600)]">✓</span>
                                Documentos de Identificação Civil válidos e com foto (RG e
                                CPF ou CNH);
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[color:var(--pv-green-600)]">✓</span>
                                Comprovante de Habilitação Profissional (OAB, CRM, CRP,
                                CREA, etc., conforme a atividade);
                            </li>
                            <li className="flex gap-2">
                                <span className="text-[color:var(--pv-green-600)]">✓</span>
                                Comprovante de Residência recente no município de Porto
                                Velho/RO.
                            </li>
                        </ul>
                    </div>
                </Passo>
            </div>

            {/* DETALHES ADICIONAIS (colapsáveis e pesquisáveis) */}
            <div className="mt-8 space-y-3">
                <details className="group rounded-md border border-gray-200 bg-white">
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        <span className="mr-2 text-[color:var(--pv-green-600)] group-open:hidden">▸</span>
                        <span className="mr-2 hidden text-[color:var(--pv-green-600)] group-open:inline">
                            ▾
                        </span>
                        Mapeamento dos Dados de Entrada do Cadastro
                    </summary>
                    <div className="border-t border-gray-200 px-4 py-3">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-gray-700">
                                        <th className="border border-gray-200 px-3 py-2 font-semibold">
                                            Seção Cadastral
                                        </th>
                                        <th className="border border-gray-200 px-3 py-2 font-semibold">
                                            Campos Obrigatórios
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600">
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2 font-medium">
                                            Dados Pessoais
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2">
                                            Nome Completo, CPF, RG, Data de Nascimento, Telefone
                                            e E-mail de contato ativo.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2 font-medium">
                                            Endereço
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2">
                                            Endereço Completo (Logradouro, Número, Complemento
                                            se houver), Bairro e CEP.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2 font-medium">
                                            Dados Profissionais
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2">
                                            Profissão ou Atividade Exercida, Local de Prestação
                                            dos Serviços e Nível de Escolaridade.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-200 px-3 py-2 font-medium">
                                            Referencial Econômico
                                        </td>
                                        <td className="border border-gray-200 px-3 py-2">
                                            Unidade Padrão Fiscal (UPF) base para o cálculo de
                                            ofício.
                                            <br />
                                            <strong>Valor Fixo Mensal Atualizado: R$ 108,52</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </details>

                <details className="group rounded-md border border-yellow-300 bg-yellow-50">
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-yellow-800 transition hover:bg-yellow-100">
                        <span className="mr-2 group-open:hidden">▸</span>
                        <span className="mr-2 hidden group-open:inline">▾</span>
                        ⚠️ Implicações e Efeitos Legais da Autodeclaração
                    </summary>
                    <div className="border-t border-yellow-300 px-4 py-3 text-sm text-yellow-900">
                        <p className="mb-3">
                            A emissão e envio desta declaração geram um compromisso formal
                            perante a Fazenda Pública Municipal. Ao submetê-la, o
                            contribuinte anui expressamente com os seguintes preceitos
                            jurídicos:
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                <strong>Fato Gerador e Lançamento:</strong> reconhecimento
                                pleno do exercício profissional autônomo habitual em Porto
                                Velho/RO e autorização para o lançamento mensal de ofício do
                                ISSQN;
                            </li>
                            <li>
                                <strong>Confissão Irrevogável de Dívida:</strong> vinculação
                                ao pagamento continuado dos valores fixados por nível de
                                escolaridade, com concordância automática às rotinas de
                                cobrança administrativa e judicial em caso de inadimplência
                                (multas de mora, juros, inscrição em Dívida Ativa, protesto
                                extrajudicial e execução fiscal);
                            </li>
                            <li>
                                <strong>Fidelidade das Informações:</strong> responsabilização
                                administrativa, civil e criminal pela veracidade absoluta de
                                todos os dados fornecidos;
                            </li>
                            <li>
                                <strong>Atualização Obrigatória:</strong> dever de comunicar
                                imediatamente à SEMEC qualquer alteração de dados cadastrais,
                                endereço ou encerramento das atividades.
                            </li>
                        </ul>
                    </div>
                </details>

                <details className="group rounded-md border border-gray-200 bg-white">
                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                        <span className="mr-2 text-[color:var(--pv-green-600)] group-open:hidden">▸</span>
                        <span className="mr-2 hidden text-[color:var(--pv-green-600)] group-open:inline">
                            ▾
                        </span>
                        Fluxo Interno de Tramitação Administrativa
                    </summary>
                    <div className="border-t border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-600">
                        <p className="mb-2">
                            Após o envio dos arquivos digitais ao e-mail do protocolo, a
                            equipe técnica realizará a conferência e triagem da integridade
                            documental. Estando a petição em conformidade, o processo será
                            autuado e distribuído ao Departamento de Gestão Tributária (DGT).
                        </p>
                        <p>
                            O DGT realizará a homologação cadastral e a ativação da inscrição
                            mobiliária nos sistemas tributários do município. Concluído o
                            trâmite, os parâmetros de faturamento por ISS Fixo são vinculados
                            ao CPF do prestador, liberando o acesso ao sistema de notas
                            eletrônicas para emissão sem limites operacionais.
                        </p>
                    </div>
                </details>
            </div>
        </section>
    );
}
