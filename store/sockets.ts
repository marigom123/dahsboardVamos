import { defineStore } from 'pinia'
export const useSockets = defineStore( 'sockets', () =>{
    const reloadConversaciones = ref(false)
    const reloadPedidios = ref(false)
    function setReloadConversaciones(value:boolean){
      console.log('se va aejecutar la actualizacion en store 13')
      reloadConversaciones.value = value
    }
    function setReloadPedidios(value:boolean){
      reloadPedidios.value = value
    }
    return { reloadConversaciones, reloadPedidios, setReloadConversaciones, setReloadPedidios }
})