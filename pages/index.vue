<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { io } from "socket.io-client";
  import Dialog from 'primevue/dialog';
  import { useTienda } from "~/store/tienda";
  
  const storeTienda:any = useTienda()
  const ls = ref(storeTienda.links)
  const linked = ref()
  const oldLink = ref()
  
  const config = useRuntimeConfig()
  const socket = io(config.public.SOCKET);
  const sockt = ref()
  const espera = ref(false)
  const admins:any = ref()
  const socketPlacaConsultada = ref()
  const infoPlacaConsultada = ref()
  const visitantes:any = ref()
  const visitantesPlaca:any = ref()
  
  onMounted(() => {
    console.log('se esta ejecutandoerdfs')
    console.log(config.public.SOCKET)
    socket.on("connect", async() => {
      console.log('Ahora estamos conectados al servidor de sockets: '+socket.id)
      sockt.value = socket.id
      socket.emit('guardarSocketAdmin')
    });
    socket.on('links', async(data:any) => {
      console.log('se esta emitiendo pedir links')
      storeTienda.setLinks(data)
      console.log('estos son los links')
      console.log(data)
    })
    socket.on("updateAdmins", (data:any) => {
      console.log('Ahora llego el socket de actualizar admins')
      admins.value = data
    }); 
    socket.on("updateVisitantes", (data:any) => {
      console.log('Ahora llego el socket de actualizar visitantes')
      console.log(data)
      visitantes.value = data
    }); 
    socket.on("updateVisitantesPlaca", (data:any) => {
      console.log('Ahora llego el socket de actualizar visitantesPlaca')
      console.log(data)
      visitantesPlaca.value = data.Visitantes
      if(data.cerrarEspera){
        espera.value=false
      }
    });
  })
  const guardarNuvoLink = (valor:number) => {
    console.log(linked.value)
    if(linked.value == oldLink.value){
      console.log('son iguales')
      return
    }else{
      console.log('son diferentes')
      //aca debemos enviar el socket al 
      socket.emit('nuevoLink', { link:linked.value, valor:valor })
    }
  }
  const copy = (async(placa:string, soc:string) => {
    socketPlacaConsultada.value = soc
    try {
      await navigator.clipboard.writeText(placa);
      socket.emit('consultandoInfoPlaca', placa)
      espera.value = true
    } catch (error:any) {
      console.error(error.message);
    }
  })
  const enviar = (val:string) => {
    if(val=='ok'){
      const data = {
        socket : socketPlacaConsultada.value,
        info : infoPlacaConsultada.value
      }
      socket.emit('retornandoInfoPlaca', data)
      infoPlacaConsultada.value = null
      return
    }
    if(val=='noRegistred'){
      const data = {
        socket : socketPlacaConsultada.value,
        info : 'noRegistred'
      }
      socket.emit('retornandoInfoPlaca', data)
      return
    }
    if(val=='vigente'){
      const data = {
        socket : socketPlacaConsultada.value,
        info : 'vigente'
      }
      socket.emit('retornandoInfoPlaca', data)
      return
    }
  }
  const limpiar = () => {
    socket.emit('limpiarVisitantes')
    return
  }
</script>

<template>
  <div>
    <Dialog class="bg-white" v-model:visible="espera" modal :pt="{}" :closeOnEscape="false" :closable="false" close>
      <div class="card-body rounded">
        <div class="text-center mb-2">
          Porfavor ingresa aqui el texto copiado de sura
        </div>
        <textarea class="form-control" rows="8" v-model="infoPlacaConsultada"></textarea>
        <div class="btn btn-success col-12 mt-2" @click="enviar('ok')" v-if="infoPlacaConsultada">Enviar</div>
        <div class="btn btn-warning col-12 mt-2" @click="enviar('noRegistred')" >Placa no registrada en el runt</div>
        <div class="btn btn-danger col-12 mt-2" @click="enviar('vigente')" >Soat vigente</div>
      </div>
    </Dialog>
    <div class="vitantesPlaca container">
      Visitantes que enviaron la placa
      <div v-for="visitanteP in visitantesPlaca" :key="visitanteP">
        <div class="row">
          <div class="border rounded border-secondary p-2 m-2 col">{{ visitanteP.socket }}</div>
          <div class="btn border rounded border-secondary p-2 m-2 col" @click="copy(visitanteP.placa, visitanteP.socket)">{{ visitanteP.placa }}</div>
          <div class="btn p-2 m-2 col" :style="visitanteP.color" @click="copy(visitanteP.placa, visitanteP.socket)" v-if="visitanteP.text == 'Copiar Placa para buscar'">{{ visitanteP.text }} <Icon name="material-symbols:content-copy"/></div>
          <div class="btn p-2 m-2 col" :style="visitanteP.color" v-else>{{ visitanteP.text }} <Icon name="material-symbols:content-copy"/></div>
        </div>
      </div>
    </div>
    <div class="vitantes container">
      visitantes
      <div v-for="visitante in visitantes" :key="visitante">
        <div class="border rounded border-secondary p-2 m-2">{{ visitante.socket }}</div>
      </div>
    </div>
    <div class="admins container border rounded border-secondary">
      <h3>Admins</h3>
      <div v-for="admin in admins" :key="admin">
        <div class="row">
          <div class="border rounded border-secondary p-2 m-2 col">{{ admin.socket }}</div>
          <div class="border rounded border-secondary p-2 m-2 col">{{ admin.rol }}</div>
        </div>
      </div>
      <div class="btn btn-danger col-12 p-2 m-2" @click="limpiar()">Limpiar visitantes</div>
    </div>
    <!-- <Links/> -->
    <div>
      <br><br>
      <table class="table table-hover table-info container border border-rounded">
        <thead>
          <tr>
            <th>#</th>
            <th>precio</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody  v-for="link,index in storeTienda.links">
          <tr>
            <td>{{ index+1 }}</td>
            <td><div>{{ link.valor }} <span><div class="ms-2 btn btn-warning">Editar precio</div></span></div></td>
            <td v-if="!link.editar">{{ link.url }} <span><div class=" ms-2 btn btn-info" @click="storeTienda.links[index].editar = true, linked = link.url, oldLink = link.url">editar link</div></span></td>
            <td v-else class="col"><input type="text" class="form-control" v-model="linked"/> <span><div class=" ms-2 btn btn-info" @click="guardarNuvoLink(link.valor), storeTienda.links[index].editar = false">guardar nuevo link</div></span></td>
          </tr>
        </tbody>
      </table>
    </div> 
</div>
</template>

<style scoped></style>
