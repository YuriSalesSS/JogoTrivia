import { carregarPerguntas } from './jsonLoader.js'
const botoes = document.querySelectorAll('.botao')


carregarPerguntas().then(data =>{
  console.log('Dados carregados:', data)

  botoes.forEach(function(botao){
    botao.addEventListener('click', function(){
      if (botao.id === 'HistoriaBt'){
        console.log('Perguntas sobre Historia')
      }else if (botao.id === 'GeografiaBt'){
        console.log('Perguntas sobre Geografia')
      }else if (botao.id === 'CienciasBt'){
        console.log('Perguntas sobre Ciencias')
      }else if(botao.id === 'ConhecimentosGBt'){
        console.log('Perguntas sobre Conhecimentos Gerais')
      }
    })
  })
}).catch(error => {
  console.error('Erro ao carregar as perguntas:', error.message);
});

  
