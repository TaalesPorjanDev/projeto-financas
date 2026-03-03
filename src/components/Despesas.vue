<template>
  <div class="despesas-table">
    <Message :msg="msg || despesas.error" v-show="msg || despesas.error" />
  </div>
  <div id="despesas-table-heading">
    <div>Descrição:</div>
    <div>Valor:</div>
    <div>Categoria:</div>
    <div>Data:</div>
  </div>

  <div v-for="despesa in despesas.despesas" :key="despesa.id">
    <p>{{ despesa.descricao }}</p>
    <p>{{ formatarMoeda(despesa.valor) }}</p>
    <p>{{ despesa.categoria }}</p>
    <p>{{ despesa.dataDespesa }}</p>
    <button @click="deleteDespesa(despesa.id)" :disabled="despesas.loading">
      {{ despesas.loading ? 'Processando...' : 'Deletar' }}
    </button>
    <select
      v-model="despesa.status"
      @change="atualizarDespesas($event, despesa)"
      :disabled="despesas.loading"
    >
      <option value="Em andamento">Em Andamento</option>
      <option value="Pendente">Pendente</option>
      <option value="Pago">Pago</option>
    </select>
  </div>
</template>

<script setup>
import Message from './Message.vue';
import { ref, onMounted } from 'vue';
import { useDespesasStore } from '@/stores/store';
const msg = ref('');
const despesas = useDespesasStore();

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}

async function deleteDespesa(id) {
  const confirmado = confirm('Tem certeza que deseja remover esta despesa?');
  if (!confirmado) return;

  try {
    await despesas.deletarDespesa(id);
    msg.value = 'Despesa removida com sucesso !';
  } catch (error) {
    msg.value = 'Erro ao remover a despesa.';
  } finally {
    setTimeout(() => {
      msg.value = '';
    }, 3000);
  }
}

async function atualizarDespesas(event, despesa) {
  const novoStatus = event.target.value;

  try {
    await despesas.updateDespesas(despesa, novoStatus);
    msg.value = 'Despesa atualizada com sucesso!';
  } catch (error) {
    msg.value = 'Erro ao atualizar a despesa.';
  } finally {
    setTimeout(() => {
      msg.value = '';
    }, 3000);
  }
}

onMounted(() => {
  despesas.getDespesas();
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
