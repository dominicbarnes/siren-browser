
'use strict'

const isElectronRenderer = require('is-electron-renderer')

if (isElectronRenderer) {
  const { shell } = require('electron')

  module.exports = function open (e) {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }
} else {
  module.exports = function noop () {}
}
