function buscarAgendamentos(email) {
    // Substitua este código pela lógica para obter o ID do usuário a partir do email
    // Você pode usar uma requisição AJAX para a API de usuários
    obterIdUsuario(email)
      .then(idUsuario => {
        if (idUsuario) {
          const url = `http://localhost/PetScheduler/api/consulta.php?id_usuario=${idUsuario}`;
  
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao buscar agendamentos.');
              }
              return response.json();
            })
            .then(agendamentos => {
              exibirAgendamentos(agendamentos);
            })
            .catch(error => {
              console.error('Erro na requisição:', error);
              alert('Erro ao buscar agendamentos. Por favor, tente novamente.');
            });
        } else {
          alert('Usuário não encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter ID do usuário:', error);
        alert('Erro ao buscar agendamentos. Por favor, tente novamente.');
      });
  }
  
  function exibirAgendamentos(agendamentos) {
    const listaAgendamentos = document.getElementById('lista-agendamentos');
    listaAgendamentos.innerHTML = ''; // Limpa a lista
  
    if (agendamentos.length > 0) {
      agendamentos.forEach(agendamento => {
        const divAgendamento = document.createElement('div');
        divAgendamento.innerHTML = `
          <strong>Pet:</strong> ${agendamento.nome_animal}<br>
          <strong>Veterinário:</strong> ${agendamento.nome_veterinario}<br>
          <strong>Data e Hora:</strong> ${agendamento.data_hora}<br>
          <strong>Tipo:</strong> ${agendamento.tipo_consulta}<br>
          <hr>
        `;
        listaAgendamentos.appendChild(divAgendamento);
      });
    } else {
      const mensagem = document.createElement('p');
      mensagem.textContent = 'Nenhum agendamento encontrado para este usuário.';
      listaAgendamentos.appendChild(mensagem);
    }
  }
  
  function obterIdUsuario(email) {
    // Implemente a lógica para buscar o ID do usuário na API
    // Exemplo usando fetch:
    return fetch(`http://localhost/PetScheduler/api/usuario.php?email=${email}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          return data[0].id_usuario; // Retorna o ID do usuário
        } else {
          return null; // Retorna null se o usuário não for encontrado
        }
      });
  }
  
  // Adicionar event listener ao botão de pesquisar
  const btnPesquisar = document.getElementById('btnPesquisar');
  btnPesquisar.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    buscarAgendamentos(email);
  });