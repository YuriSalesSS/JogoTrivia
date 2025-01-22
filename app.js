import { carregarPerguntas } from './jsonLoader.js'
const botoes = document.querySelectorAll('.botao')

carregarPerguntas().then(data =>{
    conversaoId(function(valorConvertido){
      console.log(valorConvertido)
    })
}).catch(error => {
  console.error('Erro ao carregar as perguntas:', error.message);
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
  
