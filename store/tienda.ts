import { defineStore } from 'pinia'
export const useTienda = defineStore({
  id: 'tienda',
  state: () => ({
    botonModalInicio:true,
  }),
  getters: {

  },
  actions: {
    setBotonModalInicio(value:boolean){
      this.botonModalInicio = value
    },
  }
})