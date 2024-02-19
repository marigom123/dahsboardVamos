import { defineStore } from 'pinia'
export const useSockets = defineStore( 'sockets', () =>{
    const links = ref(false)
    function setReloadLinks(value:boolean){
      console.log('se va aejecutar la actualizacion en store 13')
      links.value = value
    }
    return { links, setReloadLinks }
})