require('browser-env')()
const { mount } = require('@vue/test-utils')
const { ref } = require('vue')
const { createStore } = require('vuex')
const { useFields, setupStore, getField, setField, createFieldMapper } = require('../index')
const test = require('ava')

const addPlugin = plugin => ({
  global: { plugins: [plugin] }
})

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
  modules: {
    modA: {
      namespaced: true,
      state: {
        d: {
          e: 'value-in-module'
        }
      },
      mutations: { setField },
      getters: { getField }
    }
  }
})

test('changing basic values', async t => {
  const wrapper = mount({
    template: '<input v-model="v" />',
    setup: () => ({
      ...useFields({ v: 'foo' })
    })
  }, addPlugin(store));
  t.is(store.state.foo, 'bar')
  await wrapper.find('input').setValue('baz');
  t.is(store.state.foo, 'baz')
})

test('changing nested values', async t => {
  const wrapper = mount({
    template: '<input v-model="v" />',
    setup: () => ({
      ...useFields({ v: 'a.b.c' })
    })
  }, addPlugin(store))
  t.is(store.state.a.b.c, 'value')
  await wrapper.find('input').setValue('changed-value');
  t.is(store.state.a.b.c, 'changed-value')
})

test('changing namespaced values', async t => {
  const useFieldsInA = createFieldMapper({ getter: 'modA/getField', setter: 'modA/setField' })
  const wrapper = mount({
    template: '<input v-model="v" />',
    setup: () => ({
      ...useFieldsInA({ v: 'd.e' })
    })
  }, addPlugin(store))
  t.is(store.state.modA.d.e, 'value-in-module')
  await wrapper.find('input').setValue('changed-value-in-module');
  t.is(store.state.modA.d.e, 'changed-value-in-module')
})
