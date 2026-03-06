import React, { CSSProperties } from "react";
import { VALOR_UPF_ATUAL } from "./DadosProfissionaisSection";

// --- ESTILOS FORNECIDOS (Idênticos ao seu modelo) ---
// --- ESTILOS FORNECIDOS ---
const pdfPageStyle: CSSProperties = {
    width: "190mm",
    minHeight: "277mm",
    padding: "10mm",
    background: "#ffffff",
    fontFamily: "Arial, sans-serif",
    fontSize: "10.5pt",
    lineHeight: 1.4,
    color: "#000000",
};

const pdfHeaderStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: "18px",
    borderBottom: "2px solid #333",
    paddingBottom: "12px",
};

const pdfTitleStyle: CSSProperties = {
    fontSize: "17pt",
    marginBottom: "6px",
    margin: "20px 0 20px 0",
    color: "#000",
    fontWeight: 700,
    textAlign: "center"
};

const pdfSubTitleStyle: CSSProperties = {
    fontSize: "13pt",
    marginBottom: "4px",
    fontWeight: 400,
    color: "#333",
};

const pdfHeaderTextStyle: CSSProperties = {
    fontSize: "9pt",
    color: "#666",
};

const pdfSectionTitleStyle: CSSProperties = {
    background: "#333",
    color: "#fff",
    padding: "0 0 15px 5px",
    margin: "28px 0 2px 0", 
    fontSize: "11pt",
    fontWeight: 700,
};

const pdfFieldLineStyle: CSSProperties = {
    marginBottom: "6px",
    lineHeight: 1.6,
};

const pdfParagraphStyle: CSSProperties = {
    marginBottom: "10px",
    textAlign: "justify",
};

const pdfCheckboxLineStyle: CSSProperties = {
    margin: "6px 0",
    padding: "0 0 12px 5px",
    border: "1px solid #ddd"
};

const pdfTableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "12px 0",
};

const pdfCellStyle: CSSProperties = {
    border: "1px solid #333",
    padding: "6px",
    textAlign: "left",
    fontSize: "9.5pt",
};

const pdfThStyle: CSSProperties = {
    ...pdfCellStyle,
    background: "#f0f0f0",
    fontWeight: 700,
};

const pdfSignatureAreaStyle: CSSProperties = {
    marginTop: "35px",
    textAlign: "center",
};

const pdfSignatureLineStyle: CSSProperties = {
    borderTop: "1px solid #000",
    width: "300px",
    margin: "45px auto 8px",
};

const pdfHrStyle: CSSProperties = {
    border: "none",
    borderTop: "1px solid #333",
    margin: "15px 0",
};

const pdfPaperStyle: CSSProperties = {
    position: "relative",
    width: "210mm",
    minHeight: "297mm",
    height: "297mm",
    background: "#ffffff",
    overflow: "hidden",
};

const pdfTimbradoHeaderStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    zIndex: 1,
};

const pdfTimbradoHeaderImgStyle: CSSProperties = {
    width: "100%",
    display: "block",
};

const pdfTimbradoFooterStyle: CSSProperties = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    pointerEvents: "none",
    zIndex: 1,
};

const pdfTimbradoFooterImgStyle: CSSProperties = {
    width: "100%",
    display: "block",
};

const pdfContentLayerStyle: CSSProperties = {
    position: "relative",
    zIndex: 2,
    width: "190mm",
    minHeight: "277mm",
    padding: "25mm 10mm 28mm 10mm",
    margin: "0 auto",
    background: "transparent",
    fontFamily: "Arial, sans-serif",
    fontSize: "10.5pt",
    lineHeight: 1.4,
    color: "#000000",
};

const TIMBRADO_HEADER_SRC = "/semec-timbrado-cabecalho.png";
const TIMBRADO_FOOTER_SRC = "/semec-timbrado-rodape.png";

// Componente Wrapper da Página
export function PdfPageFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="pdf-page" style={pdfPaperStyle}>
            <div style={pdfTimbradoHeaderStyle}><img src={TIMBRADO_HEADER_SRC} alt="" style={pdfTimbradoHeaderImgStyle} /></div>
            <div style={pdfTimbradoFooterStyle}><img src={TIMBRADO_FOOTER_SRC} alt="" style={pdfTimbradoFooterImgStyle} /></div>
            <div style={pdfContentLayerStyle}>{children}</div>
        </div>
    );
}

// Tipagem das Props que o PDF vai receber da Page.tsx
type PdfProps = {
    dadosPessoais: any;
    dadosEndereco: any;
    dadosProfissionais: any;
};

// Componente Principal do PDF
export const DeclaracaoPDF = React.forwardRef<HTMLDivElement, PdfProps>(({ dadosPessoais, dadosEndereco, dadosProfissionais }, ref) => {

    // Helper: Formatar a data para o padrão formal (Ex: 05 de março de 2026)
    const formatarDataFormal = (data: string) => {
        if (!data) return "";
        const [ano, mesStr, dia] = data.split('-');
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const mesIndex = parseInt(mesStr, 10) - 1;
        const dia2 = parseInt(dia, 10);
        return `${dia2} de ${meses[mesIndex]} de ${ano}`;
    };

    // Helper: Calcular Valor Mensal baseado no Nível e na UPF Fixa
    const calcularValorMensal = (nivel: string) => {
        const multiplicadores: Record<string, number> = { '1': 1, '2': 1.5, '3': 2 };
        const upfNum = parseFloat(VALOR_UPF_ATUAL.replace(',', '.'));
        const calc = upfNum * (multiplicadores[nivel] || 0);
        return calc.toFixed(2).replace('.', ',');
    };

    const nivelInfo: Record<string, string> = {
        '1': '1 UPF',
        '2': '1,5 UPF',
        '3': '2 UPF'
    };

    const dataAtual = new Date().toLocaleDateString("pt-BR");
    const valorMensal = calcularValorMensal(dadosProfissionais.nivel);

    return (
        <div ref={ref} style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>

            {/* --- PÁGINA 1 --- */}
            <PdfPageFrame>
                <div style={{ textAlign: "center", marginBottom: "18px", borderBottom: "2px solid #333", paddingBottom: "12px" }}>
                    <h1 style={pdfTitleStyle}>DECLARAÇÃO DE EXERCÍCIO DE ATIVIDADE AUTÔNOMA</h1>
                    <h2 style={pdfSubTitleStyle}>Para fins de lançamento do ISSQN</h2>
                    <p style={pdfHeaderTextStyle}>Prefeitura Municipal de Porto Velho - Secretaria Municipal de Fazenda (SEMFAZ)</p>
                </div>

                <div style={pdfFieldLineStyle}><strong>Nome Completo:</strong> {dadosPessoais.nome}</div>
                <div style={pdfFieldLineStyle}><strong>CPF:</strong> {dadosPessoais.cpf} &nbsp;&nbsp;&nbsp; <strong>RG:</strong> {dadosPessoais.rg}</div>
                <div style={pdfFieldLineStyle}><strong>Data de Nascimento:</strong> {dadosPessoais.dataNascimento ? dadosPessoais.dataNascimento.split('-').reverse().join('/') : ''} &nbsp;&nbsp;&nbsp; <strong>Telefone:</strong> {dadosPessoais.telefone}</div>
                <div style={pdfFieldLineStyle}><strong>E-mail:</strong> {dadosPessoais.email}</div>
                <div style={pdfFieldLineStyle}><strong>Endereço:</strong> {dadosEndereco.endereco}</div>
                <div style={pdfFieldLineStyle}><strong>CEP:</strong> {dadosEndereco.cep} &nbsp;&nbsp;&nbsp; <strong>Bairro:</strong> {dadosEndereco.bairro} &nbsp;&nbsp;&nbsp; <strong>Cidade/UF:</strong> Porto Velho/RO</div>
                <div style={pdfFieldLineStyle}><strong>Profissão:</strong> {dadosProfissionais.profissao}</div>
                <div style={pdfFieldLineStyle}><strong>Local de Prestação:</strong> {dadosProfissionais.localPrestacao}</div>

                <div style={pdfSectionTitleStyle}>I - DECLARAÇÃO DE EXERCÍCIO DE ATIVIDADE AUTÔNOMA</div>
                <p style={pdfParagraphStyle}>
                    Declaro, para os devidos fins de direito e sob as penas da lei, que exerço atividade profissional autônoma, de forma habitual e permanente, prestando serviços de natureza <strong>{dadosProfissionais.profissao}</strong> no Município de Porto Velho/RO.
                </p>

                <div style={pdfSectionTitleStyle}>II - ENQUADRAMENTO NA TABELA DE APURAÇÃO DO ISSQN</div>
                <p style={pdfParagraphStyle}>Declaro que me enquadro na seguinte categoria:</p>
                
                <div style={pdfCheckboxLineStyle}><strong>[{dadosProfissionais.nivel === '1' ? 'X' : ' '}]</strong> Item 1 - Fundamental ou nenhuma escolaridade - Imposto: 1 UPF</div>
                <div style={pdfCheckboxLineStyle}><strong>[{dadosProfissionais.nivel === '2' ? 'X' : ' '}]</strong> Item 2 - Nível médio - Imposto: 1,5 UPF</div>
                <div style={pdfCheckboxLineStyle}><strong>[{dadosProfissionais.nivel === '3' ? 'X' : ' '}]</strong> Item 3 - Nível superior - Imposto: 2 UPF</div>

                <p style={{ ...pdfParagraphStyle, marginTop: "10px" }}>
                    <strong>Valor mensal devido:</strong> {nivelInfo[dadosProfissionais.nivel] || '---'}, correspondente a R$ {valorMensal}
                </p>

                <div style={pdfSectionTitleStyle}>III - RECONHECIMENTO DA OBRIGAÇÃO TRIBUTÁRIA</div>
                <p style={pdfParagraphStyle}><strong>1.</strong> RECONHEÇO que sou contribuinte autônomo, sujeito às regras dessa natureza, do ISSQN no Município de Porto Velho/RO.</p>
                <p style={pdfParagraphStyle}><strong>2.</strong> DECLARO ter plena ciência de que o ISSQN será lançado anualmente com parcelas mensais.</p>
                <p style={pdfParagraphStyle}><strong>3.</strong> CONCORDO com o lançamento anual do ISSQN pela Administração Tributária.</p>

            </PdfPageFrame>

            {/* --- PÁGINA 2 --- */}
            <PdfPageFrame>
                
                <div style={pdfSectionTitleStyle}>IV - CONFISSÃO DE DÍVIDA</div>
                <p style={pdfParagraphStyle}><strong>4.</strong> Esta declaração constitui CONFISSÃO DE DÍVIDA líquida, certa e exigível.</p>

                <p style={pdfParagraphStyle}><strong>5.</strong> RECONHEÇO que o não pagamento acarretará multa, juros e inscrição em Dívida Ativa.</p>

                <div style={pdfSectionTitleStyle}>V - RESPONSABILIDADE</div>
                <p style={pdfParagraphStyle}><strong>6.</strong> DECLARO, sob as penas da lei, que todas as informações prestadas são verdadeiras.</p>

                <div style={pdfSectionTitleStyle}>ANEXO - TABELA B</div>
                <table style={pdfTableStyle}>
                    <thead>
                        <tr>
                            <th style={pdfThStyle}>Item</th>
                            <th style={pdfThStyle}>Profissionais autônomos por nível</th>
                            <th style={pdfThStyle}>Alíquota</th>
                            <th style={pdfThStyle}>Imposto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={pdfCellStyle}>1</td>
                            <td style={pdfCellStyle}>Nível fundamental ou nenhuma escolaridade</td>
                            <td style={pdfCellStyle}>1 UPF</td>
                            <td style={pdfCellStyle}>1 UPF</td>
                        </tr>
                        <tr>
                            <td style={pdfCellStyle}>2</td>
                            <td style={pdfCellStyle}>Nível médio</td>
                            <td style={pdfCellStyle}>1,5 UPF</td>
                            <td style={pdfCellStyle}>1,5 UPF</td>
                        </tr>
                        <tr>
                            <td style={pdfCellStyle}>3</td>
                            <td style={pdfCellStyle}>Nível superior</td>
                            <td style={pdfCellStyle}>2 UPF</td>
                            <td style={pdfCellStyle}>2 UPF</td>
                        </tr>
                    </tbody>
                </table>

                {/* DATA FORMAL */}
                <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "50px", fontSize: "11pt" }}>
                    Porto Velho/RO, {formatarDataFormal(dadosProfissionais.dataDeclaracao)}
                </div>

                {/* ASSINATURA */}
                <div style={{ textAlign: "center", marginTop: "80px" }}>
                    <div style={{ borderTop: "1px solid #000", margin: "0 auto 8px", width: "300px" }}></div>
                    <strong>{dadosPessoais.nome || "_________________________________"}</strong><br />
                    CPF: {dadosPessoais.cpf || "___.___.___-__"}
                </div>

                <div style={{ marginTop: "40px", borderTop: "1px solid #333", paddingTop: "10px", fontSize: "9pt" }}>
                    <strong>BASE LEGAL:</strong> Lei Complementar Municipal nº 878/2021
                </div>

                {/* Footer Timbrado Info */}
                    {/* <div style={{ position: "absolute", bottom: "30mm", left: "10mm", right: "10mm", textAlign: "center", fontSize: "8pt", color: "#666", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                        Declaração de Atividade Autônoma - Página 2 de 2<br />
                        Documento gerado eletronicamente em {dataAtual}
                    </div> */}
            </PdfPageFrame>

        </div>
    );
});
DeclaracaoPDF.displayName = "DeclaracaoPDF";