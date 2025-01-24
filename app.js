import { carregarPerguntas } from './jsonLoader.js'
const botoes = document.querySelectorAll('.botao')
const perguntas = document.getElementById('perguntas')

carregarPerguntas().then(data =>{
    conversaoId(function(valorConvertido){
      let pergunta = data[valorConvertido][0].pergunta
      console.log(pergunta)
        
    })
}).catch(error => {
  console.error('Erro ao carregar as perguntas:', error.message)
})


function conversaoId(callback){
  botoes.forEach(function(botao){
    botao.addEventListener('click', function(){
      let valor = botao.id
      valor = valor.replace("Bt","").toLowerCase()
      callback(valor) 
    })
     
  })
 
}

