/** @jsx element */

import element from 'virtual-element'
import store from 'store'
import SirenClient from './siren-client'
import SirenEntity from './siren-entity'
import * as Nav from './nav'
import * as Error from './error'
import * as Entity from './entity'
import * as Start from './start'

const client = new SirenClient()
const history = getHistory()

export function initialState () {
  if (history.length > 0) {
    const item = history[history.length - 1]
    console.log('initial entity', item.entity.toObject())
    return { item, page: 'entity' }
  }

  return { page: 'start' }
}

export function afterMount (component, el, setState) {
  client.on('error', (error) => setState({ error }))
  client.on('entity', (entity, href) => {
    console.log('entity', href, entity.toObject())
    const item = addHistory(entity, href)
    setState({ item, error: null })
  })
}

export function render ({ state }, setState) {
  const { error, item, page } = state

  return (
    <div class='c-text'>
      <div class='o-grid o-grid--no-gutter o-panel'>
        <div class='o-grid__cell--width-15 o-panel-container'>
          <Nav history={history} active={page} onChange={changeNav} />
        </div>
        <div class='o-grid__cell--width-85 o-panel-container u-window-box--medium'>
          {error ? <Error error={error} onClose={clearError} /> : null}
          {content()}
        </div>
      </div>
    </div>
  )

  function content () {
    switch (page) {
      case 'entity': return <Entity entity={item.entity} onLink={followLink} onAction={submitAction} />
      case 'history': return <h1>History</h1>
      case 'start': return <Start onSubmit={followLink} />
    }
  }

  function changeNav (page) {
    setState({ page })
  }

  function clearError () {
    setState({ error: null })
  }

  function followLink (url) {
    console.log('link', url)
    client.get(url)
  }

  function submitAction (action, data) {
    console.log('action', action, data)
    client.submit(action, data)
  }
}

function getHistory () {
  if (!store.enabled) return []
  const history = store.get('history')
  if (!history) return []
  history.forEach(function (item) {
    item.entity = new SirenEntity(item.entity)
  })
  return history
}

function addHistory (entity, href) {
  const id = Date.now() // TODO: uuid?
  const item = { id, entity, href }
  history.push(item)
  store.set('history', history)
  return item
}

function removeHistory (item) {
  if (item) {
    history.splice(history.indexOf(item), 1) // remove single
  } else {
    history.splice(0, history.length) // remove all
  }
  store.set('history', history)
}
