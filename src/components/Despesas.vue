<template>
  <div class="despesas-table">
    <Message :msg="msg" v-show="msg" />
  </div>
  <div id="despesas-table-heading">
    <div>Descrição:</div>
    <div>Valor:</div>
    <div>Categoria:</div>
    <div>Data:</div>
  </div>
  <div v-for="despesa in todasDespesas" :key="despesa.id">
    <p>{{ despesa.descricao }}</p>
    <p>R$ {{ despesa.valor }}</p>
    <p>{{ despesa.categoria }}</p>
    <p>{{ despesa.dataDespesa }}</p>
    <button @click="deletarDespesa(despesa.id)">Deletar</button>
    <select v-model="despesa.status" @change="updateDespesas($event, despesa)">
      <option value="Em andamento">Em Andamento</option>
      <option value="Pendente">Pendente</option>
      <option value="Pago">Pago</option>
    </select>
  </div>
</template>

<script setup>
import Message from './Message.vue';
import { ref, onMounted } from 'vue';

const msg = ref('');
const todasDespesas = ref([]);

async function getDespesas() {
  const req = await fetch('http://localhost:5000/despesas');
  const data = await req.json();

  todasDespesas.value = data.map((despesa) => ({
    ...despesa,
    status: despesa.status || 'Selecione',
  }));
}

async function deletarDespesa(id) {
  const req = await fetch(`http://localhost:5000/despesas/${id}`, {
    method: 'DELETE',
  });

  const res = await req.json();

  // coloca msg de remoção

  msg.value = 'Pedido removido com sucesso !';

  setTimeout(() => {
    msg.value = '';
  }, 3000);

  // limpar os campos

  getDespesas();
}

async function updateDespesas(event, despesa) {
  const option = event.target.value;

  const dataAtualizada = {
    ...despesa,
    status: option,
  };

  const dataJson = JSON.stringify(dataAtualizada);

  const req = await fetch(`http://localhost:5000/despesas/${despesa.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: dataJson,
  });

  const res = await req.json();
  console.log('Resposta', res);

  // coloca uma mensagem de sistema

  msg.value = `A despesa N° ${res.id} foi atualizada para ${res.status}!`;

  // limpar mensagem
  setTimeout(() => {
    msg.value = '';
  }, 3000);

  // limpar os campos
  getDespesas();
}

onMounted(() => {
  getDespesas();
});
</script>

<style scoped>
.despesas-table {
  max-width: 900px;
  margin: 0 auto 16px auto;
}

/* Cabeçalho da tabela */
#despesas-table-heading {
  max-width: 900px;
  margin: 0 auto 8px auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 8px;
  padding: 10px 12px;
  background: #f5f5f5;
  border-radius: 6px;
  font-weight: 600;
  color: #333;
}

/* Cada linha de despesa */
#despesas-table-heading + div,
#despesas-table-heading + div ~ div {
  max-width: 900px;
  margin: 0 auto 6px auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr auto auto;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Textos das colunas */
#despesas-table-heading + div p,
#despesas-table-heading + div ~ div p {
  margin: 0;
  color: #444;
}

/* Botão deletar */
#despesas-table-heading + div button,
#despesas-table-heading + div ~ div button {
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background: #e53935;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

#despesas-table-heading + div button:hover,
#despesas-table-heading + div ~ div button:hover {
  background: #c62828;
}

/* Select de status */
#despesas-table-heading + div select,
#despesas-table-heading + div ~ div select {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.85rem;
}

/* Responsivo */
@media (max-width: 768px) {
  #despesas-table-heading {
    display: none;
  }

  #despesas-table-heading + div,
  #despesas-table-heading + div ~ div {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  #despesas-table-heading + div p,
  #despesas-table-heading + div ~ div p {
    font-size: 0.9rem;
  }

  #despesas-table-heading + div button,
  #despesas-table-heading + div ~ div button,
  #despesas-table-heading + div select,
  #despesas-table-heading + div ~ div select {
    width: 100%;
  }
}
</style>
