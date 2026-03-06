import React from "react";

// Tipagens para os dados de endereço
export type DadosEndereco = {
    endereco: string;
    bairro: string;
    cep: string;
};

type Props = {
    value: DadosEndereco;
    onChange: (value: DadosEndereco) => void;
    errors: any;
};

export default function EnderecoSection({ value, onChange, errors }: Props) {

    // 1. Função que formata o CEP dinamicamente (00000-000)
    function formatCEP(cep: string) {
        return cep
            .replace(/\D/g, '') // Remove tudo o que não é dígito
            .replace(/(\d{5})(\d)/, '$1-$2') // Coloca um traço após o quinto dígito
            .replace(/(-\d{3})\d+?$/, '$1'); // Impede que o usuário digite mais do que 9 caracteres permitidos
    }

    // 2. Interceptamos o valor antes de enviá-lo para o estado pai
    function handleChange(field: keyof DadosEndereco, fieldValue: string) {
        let finalValue = fieldValue;

        // Se o campo for o CEP, aplicamos a máscara
        if (field === "cep") {
            finalValue = formatCEP(fieldValue);
        }

        onChange({ ...value, [field]: finalValue });
    }

    return (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            
            {/* Cabeçalho da Seção */}
            <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-200">
                <h5 className="text-sm md:text-base font-semibold !text-gray-800">
                    ENDEREÇO
                </h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                
                {/* Endereço Completo (Ocupa a linha toda) */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Endereço Completo (Rua, Número, Complemento): <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="endereco"
                        value={value.endereco}
                        onChange={(e) => handleChange("endereco", e.target.value)}
                        placeholder="Ex: Rua das Flores, 123, Apto 4"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.endereco ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.endereco && <p className="text-red-600 text-sm mt-1">{errors.endereco}</p>}
                </div>

                {/* Bairro */}
                <div>
                    <label className="block font-semibold mb-1">
                        Bairro: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="bairro"
                        value={value.bairro}
                        onChange={(e) => handleChange("bairro", e.target.value)}
                        placeholder="Digite o bairro"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.bairro ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.bairro && <p className="text-red-600 text-sm mt-1">{errors.bairro}</p>}
                </div>

                {/* CEP */}
                <div>
                    <label className="block font-semibold mb-1">
                        CEP: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="cep"
                        value={value.cep}
                        onChange={(e) => handleChange("cep", e.target.value)}
                        placeholder="00000-000"
                        maxLength={9} // 8 dígitos + 1 traço
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.cep ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.cep && <p className="text-red-600 text-sm mt-1">{errors.cep}</p>}
                </div>

            </div>
        </div>
    );
}