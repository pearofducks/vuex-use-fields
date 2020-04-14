require('browser-env')()
const { mount } = require('@vue/test-utils')
const { ref } = require('vue')
const { createStore } = require('vuex')
const { useFields, setupStore, getField, setField } = require('../index')
const test = require('ava')

const addPlugin = plugin => ({
  global: { plugins: [plugin] }
})

const ComponentBasic = {
  template: '<input v-model="v" />',
  setup: () => ({
    ...useFields({ v: 'foo' })
  })
}

const ComponentNested = {
  template: '<input v-model="v" />',
  setup: () => ({
    ...useFields({ v: 'a.b.c' })
  })
}

const store = createStore({
  state: {
    foo: 'bar',
    a: {
      b: {
        c: 'value'
      }
    }
  },
  mutations: { setField },
  getters: { getField },
  plugins: [ setupStore ],
})

test('changing basic values', async t => {
  const wrapper = mount(ComponentBasic, addPlugin(store));
  await wrapper.find('input').setValue('baz');
  t.is(store.state.foo, 'baz')
})

test('changing nested values', async t => {
  const wrapper = mount(ComponentNested, addPlugin(store));
  await wrapper.find('input').setValue('changed-value');
  t.is(store.state.a.b.c, 'changed-value')
})
