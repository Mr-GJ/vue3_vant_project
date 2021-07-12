<template>
  <div class="home">

  </div>
</template>

<script>
import {onMounted} from 'vue';
import {getHomeALLData} from "@/networks/home";

export default {

  name: 'Home',
  components: {

  },
  setup(){
    onMounted(()=>{
      getHomeALLData().then(res=>{

      }).catch(err=>{

      })

    })
  }
}
</script>

