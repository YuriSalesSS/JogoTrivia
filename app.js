const botoes = document.querySelectorAll('.botao')


botoes.forEach(function(botao){
  botao.addEventListener('click', function(){
    if (botao.id === 'HistoriaBt'){
      console.log('Perguntas sobre Historia')
    }else if (botao.id === 'GeografiaBt'){
      console.log('Perguntas sobre Historia')
    }else if (botao.id === 'CienciasBt'){
      console.log('Perguntas sobre Ciencias')
    }else if(botao.id === 'ConhecimentosGBt'){
      console.log('Perguntas sobre Conhecimentos Gerais')
    }
  })
})




fetch('perguntas.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na resposta: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Dados carregados:', data);
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON:', error.message);
  });
