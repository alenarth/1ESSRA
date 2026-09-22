// utils.js
// Módulo Genérico / Reutilizável
// Funções de infraestrutura que podem ser usadas em qualquer formulário da empresa.
// Não acessa elementos do DOM da página: recebe tudo por parâmetro.

// FUNÇÃO 1: Validação Matemática Algorítmica do CPF
function validarCPF(cpf) {
    // Limpa pontuações mantendo apenas números
    cpf = cpf.replace(/\D/g, '');

    // Verifica tamanho de 11 dígitos ou sequências repetidas
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    // Cálculo do 1º Dígito Verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Cálculo do 2º Dígito Verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true; // CPF Válido
}

// FUNÇÃO 2: Gera e baixa um arquivo .txt no navegador via Blob
// conteudo    -> texto que vai dentro do arquivo
// nomeArquivo -> nome do arquivo baixado (ex.: "ingresso_joao_silva.txt")
function salvarDadosEmTXT(conteudo, nomeArquivo) {
    // Cria um Blob (Binary Large Object) simulando o arquivo de texto na memória do navegador
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });

    // Cria uma tag <a> oculta para disparar o download automaticamente
    const linkDownload = document.createElement('a');
    linkDownload.href = URL.createObjectURL(blob);
    linkDownload.download = nomeArquivo;

    // Simula o clique do usuário para iniciar o download e limpa a URL criada
    document.body.appendChild(linkDownload);
    linkDownload.click();
    document.body.removeChild(linkDownload);
    URL.revokeObjectURL(linkDownload.href);
}
