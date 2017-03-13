
import element from 'virtual-element'
import { tree, render } from 'deku'
import * as App from './app'

const app = tree(<App />)
render(app, document.querySelector('main'))
