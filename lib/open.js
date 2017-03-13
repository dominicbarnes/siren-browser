'use strict'

const isElectronRenderer = require('is-electron-renderer')

if (isElectronRenderer) {
  const { shell } = require('electron')

  module.exports = function open (e) {
    event.preventDefault()
    shell.openExternal(event.target.href)
  }
} else {
  module.exports = function noop () {}
}
