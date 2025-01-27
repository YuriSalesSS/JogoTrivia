import { carregarPerguntas } from './jsonLoader.js'

const botoes = document.querySelectorAll('.botao')
const perguntasContainter = document.getElementById('perguntas')

// funcao principal
carregarPerguntas()
  .then(data =>{
    console.log('Perguntas carregadas', data)
    configurarBotoes(data)
})
.catch(error => {
  console.error('Erro ao carregar as perguntas:', error.message)
})


function configurarBotoes(data){
    botoes.forEach(botao => {
      botao.addEventListener('click', () => {
        const categoria = botao.id.replace("Bt", "").toLowerCase()
        exibirPergunta(data, categoria)
      })
    })
     
  
 
}

function exibirPergunta(data, categoria){
  if (data[categoria] && data[categoria][0]){
    const pergunta = data[categoria][0].pergunta
    perguntasContainter.innerText = pergunta
  } else {
    perguntasContainter.innerText = 'Categoria não encontrada'
  }
}