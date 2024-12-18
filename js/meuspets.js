function buscarPets(email) {
    // Substitua este código pela lógica para obter o ID do usuário a partir do email
    obterIdUsuario(email)
      .then(idUsuario => {
        if (idUsuario) {
          const url = `http://localhost/PetScheduler/api/animal.php?id_usuario=${idUsuario}`;
  
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro ao buscar pets.');
              }
              return response.json();
            })
            .then(pets => {
              exibirPets(pets);
            })
            .catch(error => {
              console.error('Erro na requisição:', error);
              alert('Erro ao buscar pets. Por favor, tente novamente.');
            });
        } else {
          alert('Usuário não encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao obter ID do usuário:', error);
        alert('Erro ao buscar pets. Por favor, tente novamente.');
      });
  }
  
  function exibirPets(pets) {
    const listaPets = document.getElementById('lista-pets');
    listaPets.innerHTML = ''; // Limpa a lista
  
    if (pets.length > 0) {
      pets.forEach(pet => {
        const divPet = document.createElement('div');
        divPet.innerHTML = `
          <strong>Nome:</strong> ${pet.nome}<br>
          <strong>Espécie:</strong> ${pet.especie}<br>
          <strong>Raça:</strong> ${pet.raca}<br>
          <strong>Idade:</strong> ${pet.idade}<br>
          <hr>
        `;
        listaPets.appendChild(divPet);
      });
    } else {
      const mensagem = document.createElement('p');
      mensagem.textContent = 'Nenhum pet encontrado para este usuário.';
      listaPets.appendChild(mensagem);
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
    buscarPets(email);
  });