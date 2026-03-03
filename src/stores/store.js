import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useDespesasStore = defineStore('despesas', {
  state: () => ({
    despesas: [],
    loading: false,
    error: null,
  }),

  getters: {
    // aqui vão os valores calculados ( opcional por inquanto )
  },

  actions: {
    async getDespesas() {
      this.loading = true;
      this.error = null;

      try {
        const { data } = await api.get('/despesas');
        const resultado = data.map((despesa) => ({...despesa, status: despesa.status || 'Selecione',
      }));

      this.despesas = resultado;
      } catch (error) {
        this.error = 'Erro ao carregar despesas.';
      } finally {
        this.loading = false;
      }
    },

    async updateDespesas(despesa, novoStatus) {
      this.loading = true;
      this.error = null;
      try {
        const despesaAtualizada = {...despesa,status: novoStatus}
        await api.put(`/despesas/${despesa.id}`, despesaAtualizada);
        await this.getDespesas();
      } catch(error) {
        this.error = 'Erro ao atualizar despesa.';

      } finally {
        this.loading = false;
      }
    },


    async deletarDespesa(id) {
      this.loading = true;
      this.error = null;

      try {
        await api.delete(`/despesas/${id}`)
        await this.getDespesas();
      } catch(error) {
        this.error = 'Erro ao deletar despesa.'
      } finally {
        this.loading = false
      }
      
    },
  },
});
