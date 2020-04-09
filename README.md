# vuex-use-fields

## install

```shell
yarn add vuex-use-fields@two
```

## use

To set up the store helpers, and give this plugin a refernce to the store:

```js
import { setupStore, getField, setField } from 'vuex-use-fields'

const store = {
  state: { ... },
  mutations: { setField },
  getters: { getField },
  plugins: [ setupStore ]
}
```

To use in a component:

```js
import { useFields } from '../../index.js'

export default {
  setup: () => ({
    ...useFields({
      fieldOne: 'path.to.field.one' // creates a ref named 'fieldOne'
    }),
    ...useFields(['path.to.field.one']) // creates a ref named 'one'
  })
}
```

### namespaces

If you install the `getField` and `setField` helpers at the root of your store, you can use the `useFields` function normally, and reference your namespaces in your paths.
- `useFields(['myNamespace/path.to.field.one'])` and `useFields(['myNamespace.path.to.field.one'])` are both fine

You can also install the helpers at the namespace level, and then use `createFieldMapper` to make a new `useFields` instance specific to that namespace.

```js
const useFieldsInMyNamespace = createFieldMapper({ getter: 'myNamespace/getField', setter: 'myNamespace/setField' })

export default {
  setup: () => ({
    ...useFieldsInMyNamespace(['path.to.field.one'])
  })
}
```

## goals

- Keep module size as small as possible, even if this means limiting extra features
- Include `createFieldMapper` to support deep objects as well as namespaced stores
- Support both Vue 2 (through the Composition API), and Vue 3

*anti-goals*

- For now, Typescript support is not a priority of this plugin, this will be revisited once Vue 3 and Vuex 4 are released.

## caveats

If a component uses this plugin in Vue 2, it must either:
- use the composition API's `setup` function, and not the `computed` block from option API
- be sourced after `@vue/composition-api` has been installed
