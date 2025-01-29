import { carregarPerguntas } from './jsonLoader.js'

const botoes = document.querySelectorAll('.botao')
const perguntasContainter = document.getElementById('perguntas')
const opcoesContainer = document.getElementById("opcoes")
let pontuação = 0;

let estado = {
  historia: 0,
  geografia: 0,
  ciencias: 0,
  conhecimentosgerais: 0
}


// funcao principal
carregarPerguntas()
  .then(data =>{
    console.log('Perguntas carregadas', data)
    configurarBotoes(data)
})
.catch(error => {
  console.error('Erro ao carregar as perguntas:', error.message)
})

//funcao para configurar os sventos nos botoes
function configurarBotoes(data){
    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        const categoria = botao.id.replace("Bt", "").toLowerCase()
        exibirPergunta(data, categoria)
      })
    })
     
  
 
}
 
// funcao para exibir o conteudo da pergunta no conteiner 
function exibirPergunta(data, categoria){
    const indiceAtual = estado[categoria]
    const perguntasCategoria = data[categoria]

  if (perguntasCategoria && perguntasCategoria[indiceAtual]){
    const perguntaAtual = perguntasCategoria[indiceAtual]
    perguntasContainter.innerText = perguntaAtual.pergunta 
    const indiceCorreto = perguntaAtual.respostaCorreta 

    opcoesContainer.innerHTML = ""
    perguntaAtual.respostas.forEach((resposta, index) => {
      const botaoResposta = document.createElement("button")
      botaoResposta.innerText = resposta
      botaoResposta.classList.add('botao')
      botaoResposta.addEventListener('click', () => {
        if(index == indiceCorreto){
          pontuação += 1 
          console.log(pontuação)
        } else {
          console.log('Resposta incorreta')
        }

        estado[categoria]++
        exibirPergunta(data, categoria)
      })
      opcoesContainer.appendChild(botaoResposta)
    })


    if(estado[categoria] >= perguntasCategoria.length){
      
    }
  } else {
    if (pontuação >= 3) {
        perguntasContainter.innerText = `Fim das perguntas, sua pontuação foi: ${pontuação}, voce passou! `
    }else {
      perguntasContainter.innerText = "Infelizmente, você não passou. Tente novamente!"
    }
    
    opcoesContainer.innerHTML = ""
  }
}



