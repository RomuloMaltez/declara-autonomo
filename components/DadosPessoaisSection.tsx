import React from "react";

// Tipagens
type DadosPessoais = {
    nome: string;
    cpf: string;
    rg: string;
    dataNascimento: string;
    telefone: string;
    email: string;
};

// Aqui você pode importar o FormErrors da página principal se preferir
type Props = {
    value: DadosPessoais;
    onChange: (value: DadosPessoais) => void;
    errors: any; 
};

export default function DadosPessoaisSection({ value, onChange, errors }: Props) {

    // 1. Função que formata o CPF dinamicamente
    function formatCPF(cpf: string) {
        return cpf
            .replace(/\D/g, '') // Remove tudo o que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígitos
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Coloca um traço entre o nono e o décimo dígitos
            .replace(/(-\d{2})\d+?$/, '$1'); // Impede que o usuário digite mais do que 14 caracteres permitidos
    }

    // 2. Função que formata o Telefone dinamicamente
    function formatTelefone(telefone: string) {
        return telefone
            .replace(/\D/g, '') // Remove tudo o que não é dígito
            .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
            .replace(/(\d{5})(\d)/, '$1-$2') // Coloca traço após o quinto dígito
            .replace(/(-\d{4})\d+?$/, '$1'); // Limita a 15 caracteres (ex: (11) 99999-9999)
    }

    // Função que formata o RG dinamicamente (Apenas números com máscara genérica)
    function formatRG(rg: string) {
        let v = rg.replace(/\D/g, ''); // Remove tudo o que não é dígito

        return v;
    }

    // 3. Interceptamos o valor antes de enviá-lo para o estado pai
    function handleChange(field: keyof DadosPessoais, fieldValue: string) {
        let finalValue = fieldValue;

        // Se o campo for o CPF ou Telefone, aplicamos a máscara
        if (field === "cpf") {
            finalValue = formatCPF(fieldValue);
        } else if (field === "telefone") {
            finalValue = formatTelefone(fieldValue);
        } else if (field === "rg") {
            finalValue = formatRG(fieldValue);
        }

        onChange({ ...value, [field]: finalValue });
    }

    return (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            
            {/* Cabeçalho da Seção */}
            <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-200">
                <h5 className="text-sm md:text-base font-semibold !text-gray-800">
                    DADOS PESSOAIS
                </h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                
                {/* Nome Completo */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Nome Completo: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="nome"
                        value={value.nome}
                        onChange={(e) => handleChange("nome", e.target.value)}
                        placeholder="Digite seu nome completo"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.nome ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome}</p>}
                </div>

                {/* CPF */}
                <div>
                    <label className="block font-semibold mb-1">
                        CPF: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="cpf"
                        value={value.cpf}
                        onChange={(e) => handleChange("cpf", e.target.value)}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.cpf ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.cpf && <p className="text-red-600 text-sm mt-1">{errors.cpf}</p>}
                </div>

                {/* RG */}
                <div>
                    <label className="block font-semibold mb-1">
                        RG:
                    </label>
                    <input
                        type="text"
                        value={value.rg}
                        onChange={(e) => handleChange("rg", e.target.value)}
                        placeholder="Número do RG"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition border-gray-200`}
                    />
                </div>

                {/* Data de Nascimento */}
                <div>
                    <label className="block font-semibold mb-1">
                        Data de Nascimento: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={value.dataNascimento}
                        onChange={(e) => handleChange("dataNascimento", e.target.value)}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.dataNascimento ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.dataNascimento && <p className="text-red-600 text-sm mt-1">{errors.dataNascimento}</p>}
                </div>

                {/* Telefone */}
                <div>
                    <label className="block font-semibold mb-1">
                        Telefone: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="tel"
                        name="telefone"
                        value={value.telefone}
                        onChange={(e) => handleChange("telefone", e.target.value)}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.telefone ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.telefone && <p className="text-red-600 text-sm mt-1">{errors.telefone}</p>}
                </div>

                {/* E-mail */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        E-mail: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={value.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

            </div>
        </div>
    );
}