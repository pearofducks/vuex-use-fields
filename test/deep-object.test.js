import { splitPath, get, set } from '../lib/deep-object'
import test from 'ava'

const createState = () => ({
  a: {
    b: {
      c: {
        d: 'v'
      }
    }
  },
  arr: [
    { b: 'z', f: 'foo' },
    { c: 'x', e: 'bar' }
  ]
})

test('splitPath', async t => {
  const resultSimple = ['a', 'b', 'c']
  t.deepEqual(splitPath('a.b.c'), resultSimple)
  t.deepEqual(splitPath('a/b/c'), resultSimple)
  t.deepEqual(splitPath('a.b/c'), resultSimple)
  t.deepEqual(splitPath('a/b.c'), resultSimple)
  t.deepEqual(splitPath('a/b.c'), resultSimple)
  t.deepEqual(splitPath('a[0].b'), ['a', '0', 'b'])
  t.deepEqual(splitPath('a[0]/b'), ['a', '0', 'b'])
  t.deepEqual(splitPath('a/b[0]'), ['a', 'b', '0'])
  t.deepEqual(splitPath('a.b[0]'), ['a', 'b', '0'])
})

test('get', async t => {
  const state = createState()
  t.is(get(state, 'a.b.c.d'), 'v')
  t.is(get(state, 'arr[0].b'), 'z')
  t.is(get(state, 'arr[0].f'), 'foo')
  t.is(get(state, 'arr[1].c'), 'x')
})

test('set', async t => {
  const state = createState()
  t.is(get(state, 'a.b.c.d'), 'v')
  t.is(get(state, 'arr[0].f'), 'foo')
  t.snapshot(state)
  set(state, 'a.b.c.d', 'z')
  t.is(get(state, 'a.b.c.d'), 'z')
  set(state, 'arr[0].f', 'baz')
  t.is(get(state, 'arr[0].f'), 'baz')
  t.snapshot(state)
})
