import { arrayToObject } from '../lib/array-to-object'
import test from 'ava'

test('converts', async t => {
  t.deepEqual(arrayToObject(['a.b.c', 'd.e.f']), {
    c: 'a.b.c',
    f: 'd.e.f'
  })
  t.deepEqual(arrayToObject(['a[0].b', 'a/b[0]']), {
    0: 'a/b[0]',
    b: 'a[0].b'
  })
  t.deepEqual(arrayToObject(['a.b.z', 'd.e.z']), {
    z: 'd.e.z'
  })
})
