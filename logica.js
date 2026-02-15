const areaCadastro = document.getElementById('area-cadastro');
const areaRoleta = document.getElementById('area-roleta');
const btnConfirmar = document.getElementById('btnConfirmar');
const btnGirar = document.getElementById('btnGirar');
const roleta = document.getElementById('roleta');
const resultado = document.getElementById('resultado');

let grausAtuais = 0;
let dadosCliente = {};

// 1. AÇÃO DE CONFIRMAR DADOS
btnConfirmar.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const valor = parseFloat(document.getElementById('valorCompra').value);

    if (!nome || !telefone || isNaN(valor)) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Salva os dados
    dadosCliente = { nome, telefone, valor };

    // Troca de tela
    areaCadastro.classList.add('escondido');
    areaRoleta.classList.remove('escondido');
    document.getElementById('boas-vindas').innerText = `Boa sorte, ${nome}!`;
});

// 2. AÇÃO DE GIRAR
btnGirar.addEventListener('click', () => {
    btnGirar.disabled = true;
    
    let indiceSorteado;
    const valor = dadosCliente.valor;

    // Lógica das faixas de preço
    if (valor >= 10 && valor < 50) {
        indiceSorteado = 0; // Cai em Meia (Fatia 0)
    } else if (valor >= 50 && valor <= 100) {
        indiceSorteado = 1; // Cai em Capa (Fatia 1)
    } else {
        indiceSorteado = 5; // Outros valores cai em Surpresa
    }

    const premios = ["um Par de Meias", "uma Capa de Celular", "um Cupom", "um Par de Meias", "uma Capa de Celular", "um Brinde Surpresa"];
    
    // Cálculo do giro
    const voltas = 1800; // 8 voltas
    const anguloFatia = (360 - (indiceSorteado * 60)) - 30;
    grausAtuais += voltas + anguloFatia;
    
    roleta.style.transform = `rotate(${grausAtuais}deg)`;

    setTimeout(() => {
        resultado.innerHTML = `🎉 ${dadosCliente.nome}, você ganhou ${premios[indiceSorteado]}!`;
        console.log("Dados para o lojista:", dadosCliente);
        // Aqui você poderia enviar os dados para o seu WhatsApp ou E-mail
    }, 5000);
});