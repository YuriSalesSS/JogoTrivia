export function carregarPerguntas(){
    return fetch('perguntas.json')
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
}

