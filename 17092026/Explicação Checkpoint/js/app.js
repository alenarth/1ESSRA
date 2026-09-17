// Pega os elementos da página
const btn = document.getElementById("btnProcessar");
const divResultado = document.getElementById("resultado");

// Quando clicar no botão...
btn.addEventListener("click", function() {
    
    // 1. Pega os valores digitados nos inputs (Variáveis)
    const nomeInput = document.getElementById("nome").value;
    const idadeInput = parseInt(document.getElementById("idade").value);

    // 2. PASSA as variáveis para a função 'gerarMensagem' que está no utils.js
    const mensagemFinal = gerarMensagem(nomeInput, idadeInput);

    // 3. Mostra o resultado final na tela
    divResultado.innerText = mensagemFinal;
});