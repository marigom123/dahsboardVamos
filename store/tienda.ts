import { defineStore } from 'pinia'
export const useTienda = defineStore({
  id: 'tienda',
  state: () => ({
    botonModalInicio:true,
    links:[]
  }),
  getters: {

  },
  actions: {
    setBotonModalInicio(value:boolean){
      this.botonModalInicio = value
    },
    setLinks(value:any){
      this.links = value
    },
  }
})