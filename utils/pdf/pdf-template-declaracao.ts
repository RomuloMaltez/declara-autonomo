// src/utils/pdf/pdf-template-declaracao.ts
import { PDF_COLORS, PDF_STYLES } from './pdf-styles';
import { makeSectionBlock, makeSectionBlockBreakable, makeField, makeFieldGrid, makeCheckItem, makeSingleSignatureBlock, makeDocFooter } from './pdf-utils';

function _makeHeaderInstitucional() {
    return {
        margin: [0, 0, 0, 15],
        table: {
            widths: ['*'],
            body: [[{
                stack: [
                    { text: 'PREFEITURA MUNICIPAL DE PORTO VELHO', style: 'headerTitle' },
                    { text: 'SECRETARIA MUNICIPAL DE ECONOMIA', style: 'headerSubtitle' },
                ],
                fillColor: PDF_COLORS.backgroundSection,
                border: [false, false, false, true],
                borderColor: [null, null, null, PDF_COLORS.accentGreen],
                margin: [0, 10, 0, 10],
            }]],
        },
        layout: { hLineColor: () => PDF_COLORS.accentGreen, vLineColor: () => 'transparent' },
    };
}

export function createDeclaracaoDoc(data: any, valorUpfAtual: string) {
    // Helper: Formatar Data Formal
    const formatarDataFormal = (dataStr: string) => {
        if (!dataStr) return "";
        const [ano, mesStr, dia] = dataStr.split('-');
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const mesIndex = parseInt(mesStr, 10) - 1;
        const dia2 = parseInt(dia, 10);
        return `${dia2} de ${meses[mesIndex]} de ${ano}`;
    };

    // Helper: Calcular Valor Mensal
    const calcularValorMensal = (nivel: string) => {
        const multiplicadores: Record<string, number> = { '1': 1, '2': 1.5, '3': 2 };
        const upfNum = parseFloat(valorUpfAtual.replace(',', '.'));
        const calc = upfNum * (multiplicadores[nivel] || 0);
        return calc.toFixed(2).replace('.', ',');
    };

    const dataFormatada = formatarDataFormal(data.dadosProfissionais.dataDeclaracao);
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    const valorMensal = calcularValorMensal(data.dadosProfissionais.nivel);
    const nivelInfo: Record<string, string> = { '1': '1 UPF', '2': '1,5 UPF', '3': '2 UPF' };

    return {
        pageSize: 'A4',
        pageMargins: [40, 40, 40, 70],
        footer: function (currentPage: number, pageCount: number) {
            return makeDocFooter(currentPage, pageCount, dataHoje, 'Declaração de Atividade Autônoma');
        },
        styles: PDF_STYLES,
        defaultStyle: { font: 'Roboto', fontSize: 9.5 },
        content: [
            _makeHeaderInstitucional(),
            { text: 'DECLARAÇÃO DE EXERCÍCIO DE ATIVIDADE AUTÔNOMA', style: 'docTitle', margin: [0, 0, 0, 4] },
            { text: 'Para fins de lançamento do ISSQN', style: 'headerSubtitle', margin: [0, 0, 0, 15] },

            // DADOS DO CONTRIBUINTE
            makeSectionBlock('DADOS DO CONTRIBUINTE E ENDEREÇO', [
                makeField('Nome Completo', data.dadosPessoais.nome),
                ...makeFieldGrid([
                    { label: 'CPF', value: data.dadosPessoais.cpf },
                    { label: 'RG', value: data.dadosPessoais.rg },
                    { label: 'Data de Nasc.', value: data.dadosPessoais.dataNascimento?.split('-').reverse().join('/') },
                    { label: 'Telefone', value: data.dadosPessoais.telefone },
                ]),
                makeField('E-mail', data.dadosPessoais.email),
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e5e7eb' }], margin: [0, 6, 0, 6] },
                makeField('Endereço', data.dadosEndereco.endereco),
                ...makeFieldGrid([
                    { label: 'CEP', value: data.dadosEndereco.cep },
                    { label: 'Bairro', value: data.dadosEndereco.bairro },
                    { label: 'Cidade/UF', value: 'Porto Velho/RO' },
                ]),
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#e5e7eb' }], margin: [0, 6, 0, 6] },
                makeField('Profissão', data.dadosProfissionais.profissao),
                makeField('Local de Prestação', data.dadosProfissionais.localPrestacao),
            ]),

            // SEÇÃO I
            makeSectionBlock('I - DECLARAÇÃO DE EXERCÍCIO DE ATIVIDADE AUTÔNOMA', [
                {
                    text: [
                        'Declaro, para os devidos fins de direito e sob as penas da lei, que exerço atividade profissional autônoma, de forma habitual e permanente, prestando serviços de natureza ',
                        { text: data.dadosProfissionais.profissao || '______________', bold: true },
                        ' no Município de Porto Velho/RO.'
                    ],
                    alignment: 'justify', margin: [0, 2, 0, 2]
                }
            ]),

            // SEÇÃO II
            makeSectionBlock('II - ENQUADRAMENTO NA TABELA DE APURAÇÃO DO ISSQN', [
                { text: 'Declaro que me enquadro na seguinte categoria:', margin: [0, 0, 0, 6] },
                makeCheckItem('Item 1 - Fundamental ou nenhuma escolaridade - Imposto: 1 UPF', data.dadosProfissionais.nivel === '1'),
                makeCheckItem('Item 2 - Nível médio - Imposto: 1,5 UPF', data.dadosProfissionais.nivel === '2'),
                makeCheckItem('Item 3 - Nível superior - Imposto: 2 UPF', data.dadosProfissionais.nivel === '3'),
                {
                    text: [
                        { text: 'Valor mensal devido: ', bold: true },
                        `${nivelInfo[data.dadosProfissionais.nivel] || '---'}, correspondente a R$ ${valorMensal}`
                    ],
                    margin: [0, 6, 0, 2]
                }
            ]),

            // SEÇÃO III, IV, V (Agrupadas legalmente)
            makeSectionBlockBreakable('TERMOS E RESPONSABILIDADES LEGAIS', [
                { text: 'III - RECONHECIMENTO DA OBRIGAÇÃO TRIBUTÁRIA', bold: true, margin: [0, 0, 0, 4] },
                { text: '1. RECONHEÇO que sou contribuinte autônomo, sujeito às regras dessa natureza, do ISSQN no Município de Porto Velho/RO.', margin: [0, 0, 0, 4], alignment: 'justify' },
                { text: '2. DECLARO ter plena ciência de que o ISSQN será lançado anualmente com parcelas mensais.', margin: [0, 0, 0, 4], alignment: 'justify' },
                { text: '3. CONCORDO com o lançamento anual do ISSQN pela Administração Tributária.', margin: [0, 0, 0, 10], alignment: 'justify' },

                { text: 'IV - CONFISSÃO DE DÍVIDA', bold: true, margin: [0, 0, 0, 4] },
                { text: '4. Esta declaração constitui CONFISSÃO DE DÍVIDA líquida, certa e exigível.', margin: [0, 0, 0, 4], alignment: 'justify' },
                { text: '5. RECONHEÇO que o não pagamento acarretará multa, juros e inscrição em Dívida Ativa.', margin: [0, 0, 0, 10], alignment: 'justify' },

                { text: 'V - RESPONSABILIDADE', bold: true, margin: [0, 0, 0, 4] },
                { text: '6. DECLARO, sob as penas da lei, que todas as informações prestadas são verdadeiras.', margin: [0, 0, 0, 4], alignment: 'justify' },
            ]),

            // ANEXO - TABELA B
            makeSectionBlockBreakable('ANEXO - TABELA B', [
                {
                    table: {
                        headerRows: 1,
                        widths: ['auto', '*', 'auto', 'auto'],
                        body: [
                            // Cabeçalho da tabela
                            [
                                { text: 'Item', bold: true, fillColor: '#f0f0f0', margin: [4, 4, 4, 4] },
                                { text: 'Profissionais autônomos por nível', bold: true, fillColor: '#f0f0f0', margin: [4, 4, 4, 4] },
                                { text: 'Alíquota', bold: true, fillColor: '#f0f0f0', margin: [4, 4, 4, 4] },
                                { text: 'Imposto', bold: true, fillColor: '#f0f0f0', margin: [4, 4, 4, 4] }
                            ],
                            // Linhas
                            [{ text: '1', margin: [4, 4, 4, 4] }, { text: 'Nível fundamental ou nenhuma escolaridade', margin: [4, 4, 4, 4] }, { text: '1 UPF', margin: [4, 4, 4, 4] }, { text: '1 UPF', margin: [4, 4, 4, 4] }],
                            [{ text: '2', margin: [4, 4, 4, 4] }, { text: 'Nível médio', margin: [4, 4, 4, 4] }, { text: '1,5 UPF', margin: [4, 4, 4, 4] }, { text: '1,5 UPF', margin: [4, 4, 4, 4] }],
                            [{ text: '3', margin: [4, 4, 4, 4] }, { text: 'Nível superior', margin: [4, 4, 4, 4] }, { text: '2 UPF', margin: [4, 4, 4, 4] }, { text: '2 UPF', margin: [4, 4, 4, 4] }]
                        ]
                    },
                    layout: { hLineColor: () => '#999', vLineColor: () => '#999' }
                }
            ]),

            // ASSINATURA
            {
                unbreakable: true, // Garante que a data não separe da assinatura na quebra de página
                stack: [
                    { text: `Porto Velho/RO, ${dataFormatada}.`, alignment: 'center', bold: true, margin: [0, 20, 0, 10] },
                    makeSingleSignatureBlock(data.dadosPessoais.nome, data.dadosPessoais.cpf),
                    { text: 'BASE LEGAL: Lei Complementar Municipal nº 878/2021', style: 'footerNote', alignment: 'left', margin: [0, 20, 0, 0] }
                ]
            }
        ],
    };
}