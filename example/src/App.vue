<template>
  <div id="app">
    <div style="margin-top: 32px">
      <label for="one">This value is in root: </label>
      <input v-model="rootItem" placeholder="an item in root" id="one">
    </div>
    <div style="margin-top: 32px">
      <label for="two" style="margin-top: 32px">This value is in a namespace: </label>
      <input v-model="itemInNamespaceA" placeholder="an item in namespace a" id="two">
    </div>
    <div style="margin-top: 32px">
      <h1>Values</h1>
      <p>rootItem: {{ rootItem }}</p>
      <p>duplicateMapping: {{ duplicateMapping }}</p>
      <p>itemInNamespaceA: {{ itemInNamespaceA }}</p>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { useFields, createFieldMapper } from '../../index.js'

const useFieldsInA = createFieldMapper({ getter: 'a/getField', setter: 'a/setField' })

export default {
  name: 'app',
  components: { HelloWorld },
  setup: () => ({
    ...useFields({
      rootItem: 'itemInRoot',
      duplicateMapping: 'a.itemInNamespaceA'
    }),
    ...useFieldsInA(['itemInNamespaceA'])
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
