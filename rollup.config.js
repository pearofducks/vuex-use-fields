import pkg from './package.json'
import buble from '@rollup/plugin-buble'
import { terser } from 'rollup-plugin-terser'

const input = 'index.js'
const external = ['@vue/composition-api']
const esmOutput = { file: pkg.module, format: 'esm' }
const cjsOutput = { file: pkg.main, format: 'cjs' }

export default [
  { input, external, output: esmOutput, plugins: [terser()] },
  { input, external, output: cjsOutput, plugins: [buble(), terser()] }
]
