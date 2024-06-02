
var mario = document.querySelector('#mario');
var barril = document.querySelector('#pipe');
var posicaoBottomMario = +window.getComputedStyle(mario).bottom.replace('px', '');
var botaoReiniciar = document.querySelector('#botao-iniciar-reiniciar');
var pontos = document.querySelector('#pontos-numero');
var pontuacao = 0;

var pulando = false;
var perdeu = false;

const audio = new Audio('sons/audio.mp3');
const audioPulo = new Audio('sons/pulo.m4a');


window.onload = () => {
    audio.play();
    audio.currentTime = 0.4;
}

botaoReiniciar.addEventListener("click", () => {
    window.location.reload();    
});

document.getElementById('pular').addEventListener('touchstart', (e) => {
    e.preventDefault();
    
    
    if (!pulando) {
        if (!perdeu) {
            audioPulo.play();
        }
        pulando = true;
        mario.classList.add('jump');
    }
    
    setTimeout(() => {
        mario.classList.remove('jump');
        pulando = false;
        audioPulo.pause();
        audioPulo.currentTime = 0;
    }, 490);
});

document.addEventListener('keydown', (e) => {

    
    if (e.code === 'Space' && !pulando) {
        if (!perdeu) {
            audioPulo.play();
        }
        pulando = true;
        mario.classList.add('jump');
    }
    
    setTimeout(() => {
        mario.classList.remove('jump');
        pulando = false;
        audioPulo.pause();
        audioPulo.currentTime = 0;
    }, 498);
});

var somarPontos = setInterval(() => {
    var posicaoBarril = +window.getComputedStyle(barril).left.replace('px', '');
    
    console.log(posicaoBarril);
    
    if (mario.classList.contains('soma-ponto')) {
        pontuacao = pontuacao + 50;
        pontos.innerHTML = pontuacao;
        console.log("PONTUOU");
        mario.classList.remove('soma-ponto');
    }
    
}, 1500);

var loop = setInterval(() => {
    var posicaoBottomMario = +window.getComputedStyle(mario).bottom.replace('px', '');
    var posicaoBarril = +window.getComputedStyle(barril).left.replace('px', '');
    
    console.log(audio.currentTime);
    
    if (posicaoBottomMario > 40) {
        mario.src = 'imagens/mario-voando.png';
        mario.style.left = '-50px';
        mario.style.width = '220px';

        if (posicaoBottomMario < 42.2) { 
            mario.src = 'imagens/mario.gif';
            mario.style.left = '0px';
            mario.style.width = '120px';
            
            mario.classList.add('soma-ponto');
        }
        
    }

    if (audio.currentTime > 84) {
        audio.currentTime = 5.57;
    }
    
    if (posicaoBarril <= 105 && posicaoBottomMario < 110 && posicaoBarril > 0) {
        var imgsChao = document.querySelectorAll('.c-um, .c-dois');
        var nuvens = document.querySelectorAll('.nuvem');
        var arbustos = document.querySelectorAll('.arbusto');

        mario.classList.remove('soma-ponto');
        pontos.innerHTML = pontuacao;
        
        barril.style.animationPlayState = 'paused';    
        mario.style.animation = 'none';
        
        nuvens.forEach(nuvem => {
            nuvem.style.animationPlayState = 'paused';
        });
        
        imgsChao.forEach(chao => {
            chao.style.animationPlayState = 'paused';
        });

        arbustos.forEach(arbusto => {
            arbusto.style.animationPlayState = 'paused';
        });     
        
        mario.src = 'imagens/game-over.png';
        mario.style.bottom = `${posicaoBottomMario}px`;
        mario.style.left = `50px`;
        mario.style.width = '60px';
        mario.style.animation = 'game-over 1s ease-out 1s forwards';

        botaoReiniciar.style.color = "#2C2316";

        const audioPerdeu = new Audio('sons/perdeu.mp3');
        perdeu = true;

        audio.pause();
        audioPerdeu.play();

        clearInterval(loop);
        clearInterval(somarPontos);
    } 
}, 10);