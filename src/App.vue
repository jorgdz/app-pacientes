<template>
  <div id="app">
   <!-- <Test msg = "Hola Jorge !!!"></Test>-->

    <Nav></Nav>

    <hr>

    <router-view></router-view>
  </div>
</template>

<script>

import Nav from './components/partials/Nav'

export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>

</style>
