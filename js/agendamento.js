// Função para buscar os pets do usuário na API
function buscarPets(email) {
    // Monta a URL da API com o email do usuário
    const url = `http://localhost/PetScheduler/api/animal.php?id_usuario=${email}`; 
  
    // Faz a requisição GET para a API
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar pets.'); 
        }
        return response.json(); 
      })
      .then(pets => {
        // Chama a função para exibir os pets na página
        exibirPets(pets); 
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        // Exibe uma mensagem de erro para o usuário
        alert('Erro ao buscar pets. Por favor, tente novamente.'); 
      });
  }
  
  // Função para exibir os pets na página
  function exibirPets(pets) {
    const petSelect = document.getElementById('pet');
    petSelect.innerHTML = '<option value="">Selecione um pet</option>'; 
  
    if (pets.length > 0) {
      pets.forEach(pet => {
        const option = document.createElement('option');
        option.value = pet.id_animal; 
        option.text = pet.nome; 
        petSelect.add(option);
      });
    } else {
      // Se não encontrar pets, exibe uma mensagem
      alert('Nenhum pet encontrado para este usuário.'); 
    }
  }
  
  // Função para buscar os veterinários na API
  function buscarVeterinarios() {
    fetch('http://localhost/PetScheduler/api/veterinario.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar veterinários.');
        }
        return response.json();
      })
      .then(veterinarios => {
        exibirVeterinarios(veterinarios);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar veterinários. Por favor, tente novamente.');
      });
  }
  
  // Função para exibir os veterinários na página
  function exibirVeterinarios(veterinarios) {
    const veterinarioSelect = document.getElementById('veterinario');
    veterinarioSelect.innerHTML = '<option value="">Selecione um veterinário</option>';
  
    veterinarios.forEach(veterinario => {
      const option = document.createElement('option');
      option.value = veterinario.id_veterinario; 
      option.text = veterinario.nome; 
      veterinarioSelect.add(option);
    });
  }
  
  // Função para validar o formulário de agendamento
  function validarFormulario() {
    const email = document.getElementById('email').value;
    const pet = document.getElementById('pet').value;
    const veterinario = document.getElementById('veterinario').value;
    const dataHora = document.getElementById('data_hora').value;
  
    if (email === '' || pet === '' || veterinario === '' || dataHora === '') {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
  
    // Validar formato do email (opcional)
    // ...
  
    return true;
  }
  
  // Função para enviar a requisição de agendamento para a API
  function agendarConsulta(event) {
    event.preventDefault(); 
  
    if (validarFormulario()) {
      const email = document.getElementById('email').value;
      const pet = document.getElementById('pet').value;
      const veterinario = document.getElementById('veterinario').value;
      const dataHora = document.getElementById('data_hora').value;
  
      const dadosConsulta = {
        id_animal: pet,
        id_veterinario: veterinario,
        data_hora: dataHora,
        tipo_consulta: 'Consulta' // Você pode ajustar o tipo de consulta aqui
      };
  
      fetch('http://localhost/PetScheduler/api/consulta.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosConsulta) 
      })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
        if (data.mensagem.includes('sucesso')) {
          document.getElementById('form-agendamento').reset(); 
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao agendar consulta. Por favor, tente novamente.');
      });
    }
  }
  
  // Chamar as funções necessárias ao carregar a página
  buscarVeterinarios();
  
  // Adicionar event listener ao formulário de agendamento
  const formAgendamento = document.getElementById('form-agendamento');
  formAgendamento.addEventListener('submit', agendarConsulta);