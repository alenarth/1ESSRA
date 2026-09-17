async function somarNaAPI(n1, n2) {
    const resposta = await fetch(`https://api.mathjs.org/v4/?expr=${n1}%2B${n2}`);
    const resultado = await resposta.text();
    return resultado;
}