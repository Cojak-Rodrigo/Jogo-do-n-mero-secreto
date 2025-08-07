let listaNumerosSorteados = [];
let  numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemNaTela(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 10');
}

exibirMensagemNaTela();

function verificarChute() {
    let chute = document.querySelector('input').value;
   
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavrasTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavrasTentativas}`;
        exibirTextoNaTela('p', `${mensagemTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O número secreto é menor');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++;
        limparCampo();
    }
    
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * 100 + 1);
    let quantidadeDeElementosNaLista = listaNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == 100){
        listaNumerosSorteados = [];
    }
    
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemNaTela();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}