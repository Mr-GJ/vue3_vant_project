<template>
  <div class="backTop" @click="backScroll">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  setup(props, {emit}) {
    return {
      backScroll: () => {
        emit('btop')
      }
    }
  }
}
</script>

<style scoped>
.backTop {
  background: #FCFCFC url("~assets/images/upback.png") no-repeat center center;
  width: 47px;
  height: 47px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  border-radius: 25px;
  padding: 3px;
  z-index: 20;
  box-shadow: 5px 5px 5px #888888;
}
</style>