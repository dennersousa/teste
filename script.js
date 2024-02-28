document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario-atualizacao');
  const deleteButton = document.getElementById('excluir');
  const updateButton = document.getElementById('atualizar');

  // Função para enviar requisições POST
  async function enviarRequisicaoPOST(url, jsonData) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar a requisição: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta do servidor:', data);
  }

  // Função para enviar requisições PUT
  async function enviarRequisicaoPUT(url, jsonData) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar a entidade: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta do servidor após atualização:', data);
  }

  // Função para enviar requisições DELETE
  async function enviarRequisicaoDELETE(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir a entidade: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Resposta do servidor após exclusão:', data);
  }

  // Atualizar entidade
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
      const entityId = form.querySelector('#id').value;

      if (entityId) {
        const formData = new FormData(form);

        const jsonData = {
          razaoSocial: formData.get('razao_social'),
          nomeFantasia: formData.get('nome_fantasia'),
          cnpj: formData.get('cnpj'),
          regional: formData.get('regional'),
          dataInauguracao: formData.get('data_inauguracao'),
          ativa: formData.get('ativa') === 'on',
          especialidades: formData.getAll('especialidades'),
        };

        await enviarRequisicaoPUT(`http://localhost:3000/entidades/${entityId}`, jsonData);
      }
    } catch (error) {
      console.error('Erro ao atualizar a entidade:', error.message);
    }
  });
});
