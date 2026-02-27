import { defineStore } from 'pinia';

export const useDespesasStore = defineStore('despesas', {
  state: () => ({
    // aqui vão seus dados (refs)
    despesas: [],
  }),

  getters: {
    // aqui vão os valores calculados ( opcional por inquanto )
  },

  actions: {
    async getDespesas() {
      const req = await fetch('http://localhost:5000/despesas');
      const data = await req.json();

      const resultado = data.map((despesa) => ({
        ...despesa,
        status: despesa.status || 'Selecione',
      }));

      this.despesas = resultado;
    },

    async updateDespesas(despesa, novoStatus) {
      const dataAtualizada = {
        ...despesa,
        status: novoStatus,
      };

      const dataJson = JSON.stringify(dataAtualizada);

      const req = await fetch(`http://localhost:5000/despesas/${despesa.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson,
      });

      await req.json();
      await this.getDespesas();
    },

    async deletarDespesa(id) {
      const req = await fetch(`http://localhost:5000/despesas/${id}`, {
        method: 'DELETE',
      });
    
      await req.json()
      await this.getDespesas();
    },
  },
});
