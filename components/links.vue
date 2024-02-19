<script lang="ts" setup>
  import { useTienda } from "~/store/tienda";
  const storeTienda:any = useTienda()
  const ls = ref(storeTienda.links)
  const linked = ref()
  const oldLink = ref()
  const guardarNuvoLink = (index:number) => {
    console.log(linked.value)
    if(linked.value == oldLink.value){
      console.log('son iguales')
      return
    }else{
      console.log('son diferentes')
      //aca debemos enviar el socket al 
    }
  }
</script> 
<template>
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
        <tbody  v-for="link,index in ls">
          <tr>
            <td>{{ index+1 }}</td>
            <td><div>{{ link.valor }} <span><div class="ms-2 btn btn-warning">Editar precio</div></span></div></td>
            <td v-if="!link.editar">{{ link.url }} <span><div class=" ms-2 btn btn-info" @click="ls[index].editar = true, linked = link.url, oldLink = link.url">editar link</div></span></td>
            <td v-else class="col"><input type="text" class="form-control" v-model="linked"/> <span><div class=" ms-2 btn btn-info" @click="guardarNuvoLink(index), ls[index].editar = false">guardar nuevo link</div></span></td>
          </tr>
        </tbody>
      </table>
    </div>        
</template>
<style scoped>
</style>