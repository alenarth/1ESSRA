// FUNÇÃO: Faz o fetch na API enviando os dois números para somar
function somarNaAPI(numero1, numero2) {
    // 1. Monta a expressão matemática (Ex: "15 + 25")
    const expressao = `${numero1} + ${numero2}`;
    
    // 2. URL da MathJS API (encodeURIComponent evita problemas com o símbolo de +)
    const url = `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expressao)}`;

    // 3. Faz o fetch na API externa
    return fetch(url)
        .then(resposta => {
            if (!resposta.ok) throw new Error("Erro na requisição");
            return resposta.text(); // A MathJS API devolve o resultado em formato texto
        })
        .then(resultadoCalculado => {
            // --- TRATAMENTO DO RETORNO ---
            // Formata o valor antes de devolver para o app.js
            return `A soma de ${numero1} + ${numero2} é igual a: ${resultadoCalculado}`;
        })
        .catch(erro => {
            console.error("Erro no fetch:", erro);
            return "Erro ao realizar o cálculo na API.";
        });
}