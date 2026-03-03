import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useDespesasStore = defineStore('despesas', {
  state: () => ({
    despesas: [],
    loading: false,
    error: null,
    descricao: '',
    valor: 0,
    categoria: '',
    data: '',
    msg: '',
}),

  getters: {
    // aqui vão os valores calculados ( opcional por inquanto )
  },

  actions: {

    async adicionarDespesa() {
      this.loading = true;
      this.error = null;

      const data_despesas = {
        descricao: this.descricao,
        valor: this.valor,
        categoria: this.categoria,
        data: this.data
      }

      try {
        await api.post('/despesas', data_despesas);
        this.msg = 'Despesa adicionada com  sucesso!'
        
        // limpar os campos
        this.descricao = '';
        this.valor = 0;
        this.categoria = '';
        this.data = '';

        await this.getDespesas()
        
        setTimeout(() => {
        this.msg = '';
        }, 3000);

      } catch(error) {
        this.error = 'Não foi possivel adicionar, tente novamente!'
      } finally {
        this.loading = false;
        
        
      }

      
    },
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
