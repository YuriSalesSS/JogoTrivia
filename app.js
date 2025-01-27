import { carregarPerguntas } from './jsonLoader.js'

const botoes = document.querySelectorAll('.botao')
const perguntasContainter = document.getElementById('perguntas')

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
    const pergunta = perguntasCategoria[indiceAtual].pergunta
    perguntasContainter.innerText = pergunta 

    estado[categoria]++
    if(estado[categoria >= perguntasCategoria.lenght]){
      estado[categoria] = 0
    }
  } else {
    perguntasContainter.innerText = 'Categoria não encontrada'
  }
}