import React from "react";

// ============================================================================
// ⚠️ CONFIGURAÇÃO ANUAL: Altere este valor quando a UPF for atualizada
// ============================================================================
export const VALOR_UPF_ATUAL = "108,52"; 
// ============================================================================

export type DadosProfissionais = {
    profissao: string;
    localPrestacao: string;
    nivel: string;
    dataDeclaracao: string;
};

type Props = {
    value: DadosProfissionais;
    onChange: (value: DadosProfissionais) => void;
    errors: any;
};

export default function DadosProfissionaisSection({ value, onChange, errors }: Props) {

    // Função simples para atualizar o estado
    function handleChange(field: keyof DadosProfissionais, fieldValue: string) {
        onChange({ ...value, [field]: fieldValue });
    }

    return (
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            
            {/* Cabeçalho da Seção */}
            <div className="bg-gray-100 px-4 py-2 rounded-t-md border-b border-gray-200">
                <h5 className="text-sm md:text-base font-semibold !text-gray-800 flex items-center gap-2">
                    DADOS PROFISSIONAIS
                </h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                
                {/* Profissão / Atividade */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Profissão / Atividade Exercida: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        name="profissao"
                        value={value.profissao}
                        onChange={(e) => handleChange("profissao", e.target.value)}
                        placeholder="Ex: Eletricista, Pedreiro, Manicure, etc."
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.profissao ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.profissao && <p className="text-red-600 text-sm mt-1">{errors.profissao}</p>}
                </div>

                {/* Local de Prestação dos Serviços */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Local de Prestação dos Serviços: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                        rows={2}
                        value={value.localPrestacao}
                        name="localPrestacao"
                        onChange={(e) => handleChange("localPrestacao", e.target.value)}
                        placeholder="Descreva onde os serviços são prestados (ex: Em domicílio, no endereço X, etc.)"
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition resize-none ${errors.localPrestacao ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.localPrestacao && <p className="text-red-600 text-sm mt-1">{errors.localPrestacao}</p>}
                </div>

                {/* Nível de Escolaridade */}
                <div>
                    <label className="block font-semibold mb-1">
                        Nível de Escolaridade: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                        value={value.nivel}
                        name="nivel"
                        onChange={(e) => handleChange("nivel", e.target.value)}
                        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition bg-white ${errors.nivel ? "border-red-500" : "border-gray-200"}`}
                    >
                        <option value="">Selecione...</option>
                        <option value="1">Nível Fundamental ou Nenhuma Escolaridade (1 UPF)</option>
                        <option value="2">Nível Médio (1,5 UPF)</option>
                        <option value="3">Nível Superior (2 UPF)</option>
                    </select>
                    {errors.nivel && <p className="text-red-600 text-sm mt-1">{errors.nivel}</p>}
                </div>

                {/* Valor da UPF (Destacado e Fixo) */}
                <div>
                    <label className="block font-semibold mb-1">
                        Valor da UPF (Ano Vigente):
                    </label>
                    <div className="w-full p-2 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between shadow-sm">
                        <span className="text-blue-800 text-sm font-medium">Fixo Atual:</span>
                        <span className="text-blue-900 font-bold text-lg">R$ {VALOR_UPF_ATUAL}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        * Unidade Padrão Fiscal base para o cálculo.
                    </p>
                </div>

                {/* Data da Declaração */}
                <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">
                        Data da Declaração: <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                        type="date"
                        name="dataDeclaracao"
                        value={value.dataDeclaracao}
                        onChange={(e) => handleChange("dataDeclaracao", e.target.value)}
                        className={`w-full md:w-1/2 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-pv-blue-900 focus:border-pv-blue-600 transition ${errors.dataDeclaracao ? "border-red-500" : "border-gray-200"}`}
                    />
                    {errors.dataDeclaracao && <p className="text-red-600 text-sm mt-1">{errors.dataDeclaracao}</p>}
                </div>

            </div>
        </div>
    );
}