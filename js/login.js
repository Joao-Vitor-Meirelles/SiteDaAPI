function validarFormularioLogin() {
    const email = document.getElementById('editTextEmail').value;
    const senha = document.getElementById('editTextSenha').value;
  
    if (email === '' || senha === '') {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
  
    return true;
  }
  
  function fazerLogin(event) {
    event.preventDefault();
  
    if (validarFormularioLogin()) {
      const email = document.getElementById('editTextEmail').value;
      const senha = document.getElementById('editTextSenha').value;
  
      const dadosLogin = {
        email: email,
        senha: senha
      };
  
      fetch('http://localhost/PetScheduler/api/usuario.php', { //ajuste a url se necessário
        method: 'POST', // ou GET, dependendo da sua API
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) { 
          // Armazenar dados do usuário (se necessário) - localStorage, sessionStorage ou cookies
          // Redirecionar para a página do menu
          window.location.href = 'menu.html'; 
        } else {
          alert(data.mensagem); // Exibir mensagem de erro da API
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao fazer login. Por favor, tente novamente.');
      });
    }
  }
  
  // Adicionar event listener ao formulário de login
  const formLogin = document.getElementById('buttonEntrar');
  formLogin.addEventListener('click', fazerLogin);