// Função para validar o formulário de cadastro de pet
function validarFormularioPet() {
    const nome = document.getElementById('nome').value;
    const especie = document.getElementById('especie').value;
    const idade = document.getElementById('idade').value;
  
    if (nome === '' || especie === '' || idade === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }
  
    // Validar a idade (opcional): verificar se é um número positivo
    if (idade <= 0) {
      alert('Por favor, insira uma idade válida.');
      return false;
    }
  
    return true;
  }
  
  // Função para enviar a requisição de cadastro de pet para a API
  function cadastrarPet(event) {
    event.preventDefault(); // Previne o comportamento padrão do submit
  
    if (validarFormularioPet()) {
      const nome = document.getElementById('nome').value;
      const especie = document.getElementById('especie').value;
      const idade = document.getElementById('idade').value;
      const raca = document.getElementById('raca').value;
  
      // Obter o ID do usuário (substitua pelo método de autenticação do seu sistema)
      const idUsuario = obterIdUsuario(); // Implemente a função obterIdUsuario()
  
      const dadosPet = {
        nome: nome,
        especie: especie,
        idade: idade,
        raca: raca,
        id_usuario: idUsuario
      };
  
      fetch('http://localhost/PetScheduler/api/animal.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosPet)
      })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
        if (data.mensagem.includes('sucesso')) {
          document.getElementById('form-cadastrarpet').reset(); // Limpa o formulário
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar pet. Por favor, tente novamente.');
      });
    }
  }
  
  // Função para obter o ID do usuário (implemente de acordo com o seu sistema)
  function obterIdUsuario() {
    // Substitua este código pela lógica para obter o ID do usuário logado
    // Exemplo: obter o ID de um cookie, localStorage ou sessão
    const idUsuario = 1; // Substitua pelo ID do usuário
    return idUsuario;
  }
  
  // Adicionar event listener ao formulário de cadastro de pet
  const formCadastrarPet = document.getElementById('form-cadastrarpet');
  formCadastrarPet.addEventListener('submit', cadastrarPet);