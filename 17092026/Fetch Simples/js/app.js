// Captura os elementos do HTML
const btnCalcular = document.getElementById("btnCalcular");
const divResultado = document.getElementById("resultado");

btnCalcular.addEventListener("click", function() {
    // 1. Captura os valores dos dois inputs do HTML
    const n1 = document.getElementById("num1").value;
    const n2 = document.getElementById("num2").value;

    // Validação simples de preenchimento
    if (n1 === "" || n2 === "") {
        divResultado.innerText = "Por favor, digite os dois números!";
        return;
    }

    // 2. Feedback visual de carregamento
    divResultado.innerText = "🔄 Processando na API...";

    // 3. CHAMA a função que está em js/utils.js passando os números
    somarNaAPI(n1, n2).then(textoTratado => {
        // 4. Recebe a resposta tratada e coloca na tela
        divResultado.innerText = textoTratado;
    });
});