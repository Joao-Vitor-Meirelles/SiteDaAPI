// Função para validar o formulário de cadastro
function validarFormulario() {
    const nome = document.getElementById('editTextNome').value;
    const telefone = document.getElementById('editTextTelefone').value;
    const email = document.getElementById('editTextEmail').value;
    const senha = document.getElementById('editTextSenha').value;
  
    if (nome === '' || telefone === '' || email === '' || senha === '') {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
  
    // Validar formato do email (opcional)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.');
      return false;
    }
  
    return true;
  }
  
  // Função para enviar a requisição de cadastro para a API
  function cadastrarUsuario(event) {
    event.preventDefault(); // Previne o comportamento padrão do submit
  
    if (validarFormulario()) {
      const nome = document.getElementById('editTextNome').value;
      const telefone = document.getElementById('editTextTelefone').value;
      const email = document.getElementById('editTextEmail').value;
      const senha = document.getElementById('editTextSenha').value;
  
      const dadosUsuario = {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha
      };


      console.log(dadosUsuario)
      fetch('http://localhost/PetScheduler/api/usuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosUsuario)
      })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem);
        if (data.mensagem.includes('sucesso')) {
          window.location.href = 'login.html'; // Redireciona para a página de login
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao cadastrar usuário. Por favor, tente novamente.');
      });
    }
  }
  
  // Adicionar event listener ao formulário de cadastro
  const formCadastro = document.getElementById('buttonConcluirCadastro');
  formCadastro.addEventListener('click', cadastrarUsuario);