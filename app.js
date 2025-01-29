import { carregarPerguntas } from './jsonLoader.js';

const botoes = document.querySelectorAll('.botao');
const perguntasContainer = document.getElementById('perguntas');
const opcoesContainer = document.getElementById('opcoes');
const total_perguntas = 10;
const percentual_aprovacao = 70;

let pontuacao = 0;
let estado = {
  historia: 0,
  geografia: 0,
  ciencias: 0,
  conhecimentosgerais: 0
};

// Função principal
carregarPerguntas()
  .then(data => {
    console.log('Perguntas carregadas', data);
    configurarBotoes(data);
  })
  .catch(error => {
    console.error('Erro ao carregar as perguntas:', error.message);
  });

// Função para configurar os eventos nos botões
function configurarBotoes(data) {
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const categoria = botao.id.replace("Bt", "").toLowerCase();
      exibirPergunta(data, categoria);
    });
  });
}

// Função para exibir o conteúdo da pergunta no container
function exibirPergunta(data, categoria) {
  if (estado[categoria] >= data[categoria].length) {
    finalizarJogo();
    return;
  }

  const indiceAtual = estado[categoria];
  const perguntasCategoria = data[categoria];

  if (perguntasCategoria && perguntasCategoria[indiceAtual]) {
    const perguntaAtual = perguntasCategoria[indiceAtual];
    perguntasContainer.innerText = perguntaAtual.pergunta;
    const indiceCorreto = perguntaAtual.respostaCorreta;

    opcoesContainer.innerHTML = "";
    perguntaAtual.respostas.forEach((resposta, index) => {
      const botaoResposta = criarBotaoResposta(resposta, () => {
        if (index === indiceCorreto) {
          pontuacao += 1;
          console.log(`Pontuação: ${pontuacao}`);
        } else {
          console.log('Resposta incorreta');
        }

        estado[categoria]++;
        exibirPergunta(data, categoria);
      });
      opcoesContainer.appendChild(botaoResposta);
    });
  }
}

// Função para criar botões de resposta
function criarBotaoResposta(texto, onClick) {
  const botao = document.createElement("button");
  botao.innerText = texto;
  botao.classList.add('botao');
  botao.addEventListener('click', onClick);
  return botao;
}

// Função para finalizar o jogo
function finalizarJogo() {
  const percentual = (pontuacao / total_perguntas) * 100;

  if (percentual >= percentual_aprovacao) {
    perguntasContainer.innerText = `Parabéns! Você passou com ${pontuacao} pontos (${percentual.toFixed(2)}%).`;
  } else {
    perguntasContainer.innerText = `Infelizmente, você não passou. Sua pontuação: ${pontuacao} (${percentual.toFixed(2)}%).`;
  }

  opcoesContainer.innerHTML = "";
  const botaoReiniciar = criarBotaoResposta('Jogar Novamente', reiniciarJogo);
  opcoesContainer.appendChild(botaoReiniciar);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  pontuacao = 0;
  for (let categoria in estado) {
    estado[categoria] = 0;
  }
  perguntasContainer.innerText = 'Escolha uma categoria para começar!';
  opcoesContainer.innerHTML = "";
}