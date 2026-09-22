// app.js
// Módulo Específico / Regra de Negócio do Rock in Rio
// Depende de: js/artistasData.js (artistasData) e js/utils.js (validarCPF, salvarDadosEmTXT)

// 1. Mapeamento dos Elementos do DOM
const campoNome = document.getElementById('campoNome');
const campoCpf = document.getElementById('campoCpf');
const campoEmail = document.getElementById('campoEmail');
const campoCelular = document.getElementById('campoCelular');
const campoArtista = document.getElementById('campoArtista');
const listaArtistas = document.getElementById('listaArtistas');
const btnCadastrar = document.getElementById('btnCadastrar');
const divResultado = document.getElementById('painelResultado');

// 2. FUNÇÃO: Popular o Datalist (Busca Pesquisável de Artistas)
function popularDatalistArtistas(lista) {
    listaArtistas.innerHTML = '';
    lista.forEach((artista) => {
        const option = document.createElement('option');
        // O valor exibido na busca conterá Origem, Nome, Estilo e Dia do Show
        option.value = `[${artista.origem}] ${artista.nome} (${artista.estilo}) - ${artista.dia}`;
        listaArtistas.appendChild(option);
    });
}

// 3. FUNÇÃO: Monta o texto do comprovante com o cabeçalho do evento (RN-08)
function montarComprovante(dados) {
    return `=== PRÉ-CADASTRO DE INGRESSO ROCK IN RIO ===\n` +
        `Nome: ${dados.nome}\n` +
        `CPF: ${dados.cpf}\n` +
        `E-mail: ${dados.email}\n` +
        `Celular: ${dados.celular || 'Não informado'}\n` +
        `Atração Selecionada: ${dados.artista}\n` +
        `===========================================\n`;
}

// 4. FUNÇÃO: Gera o nome do arquivo no padrão ingresso_nome_do_usuario.txt
function gerarNomeArquivo(nome) {
    const nomeFormatado = nome
        .toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
        .replace(/[^a-z0-9\s]/g, '')                      // remove caracteres especiais
        .trim()
        .replace(/\s+/g, '_');                            // espaços viram "_"
    return `ingresso_${nomeFormatado}.txt`;
}

// 5. Máscaras Dinâmicas (CPF e Celular)
campoCpf.addEventListener('input', function() {
    let valor = campoCpf.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campoCpf.value = valor;
});

campoCelular.addEventListener('input', function() {
    let valor = campoCelular.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    campoCelular.value = valor;
});

// 6. Processamento do Formulário ao Clicar no Botão
btnCadastrar.addEventListener('click', function() {
    // Array com os campos estritamente OBRIGATÓRIOS (Celular mantido fora)
    const camposObrigatorios = [campoNome, campoCpf, campoEmail, campoArtista];
    let temCampoVazio = false;

    // Validação de Preenchimento Obrigatório
    camposObrigatorios.forEach(campo => {
        if (campo.value.trim() === '') {
            campo.classList.add('campo-erro');
            temCampoVazio = true;
        } else {
            campo.classList.remove('campo-erro');
        }
    });

    if (temCampoVazio) {
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Atenção: Preencha todos os campos obrigatórios em destaque!';
        return;
    }

    // Validação Matemática do CPF (função vinda do utils.js)
    if (!validarCPF(campoCpf.value)) {
        campoCpf.classList.add('campo-erro');
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Atenção: O CPF digitado é inválido!';
        return;
    }

    // Objeto com os dados para salvar
    const dadosReserva = {
        nome: campoNome.value.trim(),
        cpf: campoCpf.value.trim(),
        email: campoEmail.value.trim(),
        celular: campoCelular.value.trim(), // OPCIONAL
        artista: campoArtista.value.trim()
    };

    // Geração e download automático do comprovante .txt (função vinda do utils.js)
    const conteudoComprovante = montarComprovante(dadosReserva);
    const nomeArquivo = gerarNomeArquivo(dadosReserva.nome);
    salvarDadosEmTXT(conteudoComprovante, nomeArquivo);

    // Mensagem de Sucesso na Tela
    divResultado.className = 'msg-sucesso';
    divResultado.innerText = `Intenção de compra registrada com sucesso para: ${dadosReserva.artista}! Comprovante exportado.`;
});

// Inicialização: Carrega os dados de artistasData.js dentro do Datalist
popularDatalistArtistas(artistasData);
