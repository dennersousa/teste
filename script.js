document.addEventListener('DOMContentLoaded', function () {
  const formAtualizacao = document.getElementById('formulario-atualizacao');
  const updateButton = document.getElementById('atualizar');
  const formCadastro = document.getElementById('formulario-entidade');
  const submitButton = document.getElementById('enviar');
  const messageElement = document.getElementById('mensagem');

  // Função para enviar requisições POST ou PUT
  async function enviarRequisicao(url, jsonData, method) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      // Exibir mensagem de sucesso ou erro ao usuário (opcional)
      messageElement.textContent = data.success ? 'Ação realizada com sucesso!' : data.message || 'Erro ao realizar a ação.';
      messageElement.classList.add(data.success ? 'success' : 'error');
    } catch (error) {
      console.error('Erro na requisição:', error.message);
      // Exibir mensagem de erro ao usuário (opcional)
      messageElement.textContent = 'Erro ao realizar a ação.';
      messageElement.classList.add('error');
    }
  }

  // Ação do botão de atualização
  if (updateButton) {
    updateButton.addEventListener('click', async function (event) {
      event.preventDefault(); // Evita o comportamento padrão de recarregar a página

      try {
        const entityId = document.getElementById('id').value;

        if (entityId) {
          const formData = new FormData(formAtualizacao);

          const jsonData = {
            razaoSocial: formData.get('razao_social'),
            nomeFantasia: formData.get('nome_fantasia'),
            cnpj: formData.get('cnpj'),
            regional: formData.get('regional'),
            dataInauguracao: formData.get('data_inauguracao'),
            ativa: formData.get('ativa') === 'on',
            especialidades: formData.getAll('especialidades'),
          };

          await enviarRequisicao(`http://localhost:3000/entidades/${entityId}`, jsonData, 'PUT');
        }
      } catch (error) {
        console.error('Erro na ação do botão Atualizar:', error.message);
      }
    });
  }

  // Ação do botão de envio
  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault(); // Evita o comportamento padrão de recarregar a página

      try {
        const formData = new FormData(formCadastro);

        const jsonData = {
          razaoSocial: formData.get('razao_social'),
          nomeFantasia: formData.get('nome_fantasia'),
          cnpj: formData.get('cnpj'),
          regional: formData.get('regional'),
          dataInauguracao: formData.get('data_inauguracao'),
          ativa: formData.get('ativa') === 'on',
          especialidades: formData.getAll('especialidades'),
        };

        await enviarRequisicao('http://localhost:3000/entidades', jsonData, 'POST');
      } catch (error) {
        console.error('Erro na ação do botão Enviar:', error.message);
      }
    });
  }
});
