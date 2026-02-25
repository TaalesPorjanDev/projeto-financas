import { defineStore } from 'pinia'

export const useDespesasStore = defineStore('despesas', {
    state: () => ({
        // aqui vão seus dados (refs)
        despesas: []
    }),

    getters: {
        // aqui vão os valores calculados ( opcional por inquanto )
    },

    actions: {
        async getDespesas() {
            const req = await fetch('http://localhost:5000/despesas')
            const data = await req.json()
            

            this.despesas = data.map((despesa) => ({
                ...despesa,
                status: despesa.status || 'Selecione'
            }))
        }
        
    }


})