<template>
  <div>
    <Message :msg="msg" v-show="msg" />
  </div>
  <section class="adicionar-despesa">
    <h2>Adicionar Despesa</h2>
    <form @submit.prevent="adicionarDespesa">
      <div class="form-element">
        <label for="descricao">Descrição:</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          v-model="descricao"
          required
        />
      </div>
      <div class="form-element">
        <label for="valor">Valor:</label>
        <Money3 v-model="valor" v-bind="moneyConfig" id="valor" class="input"  required/>
      </div>
      <div class="form-element">
        <label for="categoria">Categoria:</label>
        <select name="categoria" id="categoria" v-model="categoria">
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Lazer">Lazer</option>
          <option value="Saúde">Saúde</option>
          <option value="Outros">Outros</option>
        </select>
      </div>
      <div class="form-element">
        <label for="data">Data:</label>
        <input type="date" id="data" name="data" v-model="data" />
      </div>

      <button type="submit">Adicionar Despesa</button>
    </form>
  </section>
</template>

<script setup>
import Message from './Message.vue';
import { ref } from 'vue';
import { Money3 } from 'v-money3';

const descricao = ref('');
const valor = ref(0);
const categoria = ref('');
const data = ref('');
const msg = ref('');

const moneyConfig = {
  prefix: 'R$',
  thousands: '.',
  decimal: ',',
  precision: 2,
  masked: false,
};

async function adicionarDespesa() {
  const data_despesas = {
    descricao: descricao.value,
    valor: valor.value,
    categoria: categoria.value,
    data: data.value,
  };

  const dataJson = JSON.stringify(data_despesas);

  try {
    const req = await fetch('/api/despesas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: dataJson,
    });

    if (req.ok) {
      msg.value = 'Despesa adicionada com sucesso!';
    } else {
      msg.value = 'Não foi possivel adicionar , tente novamente! ';
    }
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    msg.value = '';
  }, 3000);

  // limpar os campos

  descricao.value = '';
  valor.value = 0;
  categoria.value = '';
  data.value = '';
}
</script>

<style scoped>
.adicionar-despesa {
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    0 10px 30px rgba(15, 23, 42, 0.08),
    0 1px 2px rgba(15, 23, 42, 0.06);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

.adicionar-despesa h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
}

.adicionar-despesa form {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.form-element {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.form-element label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #475569;
}

/* Inputs e selects */
.form-element input,
.form-element select {
  padding: 0.65rem 0.8rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.95rem;
  color: #0f172a;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    background-color 0.15s ease;
}

.form-element input::placeholder {
  color: #9ca3af;
}

.form-element input:focus,
.form-element select:focus {
  outline: none;
  border-color: #6366f1;
  background-color: #ffffff;
  box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.35);
}

/* Botão principal */
.adicionar-despesa button[type='submit'] {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.35);
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease,
    filter 0.1s ease;
}

.adicionar-despesa button[type='submit']:hover {
  filter: brightness(1.05);
  box-shadow: 0 12px 28px rgba(79, 70, 229, 0.45);
  transform: translateY(-1px);
}

.adicionar-despesa button[type='submit']:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(79, 70, 229, 0.35);
}

/* Responsivo */
@media (max-width: 480px) {
  .adicionar-despesa {
    margin: 1rem;
    padding: 1.5rem;
  }

  .adicionar-despesa h2 {
    font-size: 1.25rem;
  }
}
</style>
