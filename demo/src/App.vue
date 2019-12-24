<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <input v-model="foo" placeholder="llamas">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { useFields } from '../../index'

export default {
  name: 'app',
  components: { HelloWorld },
  setup: () => ({
    ...useFields({ foo: 'llama' })
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
