// FUNÇÃO 1: Apenas formata o nome para MAIÚSCULAS
function formatarTexto(texto) {
    return texto.toUpperCase();
}

// FUNÇÃO 2: Recebe as variáveis do app.js e DEPENDE da Função 1
function gerarMensagem(nomeRecebido, idadeRecebida) {
    // 1. Usa a Função 1 para formatar o nome
    const nomeFormatado = formatarTexto(nomeRecebido);

    // 2. Faz um cálculo simples de idade
    const anoAtual = 2026;
    const anoNascimento = anoAtual - idadeRecebida;

    // 3. Retorna a frase montada
    return `Olá ${nomeFormatado}, você nasceu em ${anoNascimento}!`;
}