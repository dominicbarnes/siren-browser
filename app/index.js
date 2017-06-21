/** @jsx element */

import element from 'virtual-element'
import store from 'store'
import SirenClient from './siren-client'
import SirenEntity from './siren-entity'
import * as Nav from './nav'
import * as Error from './error'
import * as Start from './start'
import * as Properties from './entity/properties'
import * as Links from './entity/links'
import * as Actions from './entity/actions'
import * as Entities from './entity/entities'

const client = new SirenClient()
const history = getHistory()

export function initialState () {
  if (history.length > 0) {
    const item = history[history.length - 1]
    console.log('initial entity', item.entity.toObject())
    return { item, page: 'properties' }
  }

  return { page: 'start' }
}

export function afterMount (component, el, setState) {
  client.on('error', (error) => setState({ error }))
  client.on('entity', (entity, href) => {
    console.log('entity', href, entity.toObject())
    const item = addHistory(entity, href)
    setState({ item, error: null, subentity: null })
  })
}

export function render ({ state }, setState) {
  const { error, item, page, subentity } = state
  const { entity } = item

  return (
    <div class='c-text'>
      <div class='o-grid o-grid--no-gutter o-panel'>
        <div class='o-grid__cell--width-25 o-grid__cell--width-15@large o-panel-container'>
          <Nav active={page} entity={entity} subentity={subentity} history={history} onChange={changeNav} onUnset={unsetSubEntity} />
        </div>
        <div class='o-grid__cell--width-75 o-grid__cell--width-85@large o-panel-container u-window-box--medium'>
          {error ? <Error error={error} onClose={clearError} /> : null}
          {content(subentity || entity)}
        </div>
      </div>
    </div>
  )

  function content (entity) {
    switch (page) {
      case 'properties': return <Properties properties={entity.properties()} />
      case 'links': return <Links links={entity.links()} onLink={followLink} />
      case 'actions': return <Actions actions={entity.actions()} onAction={submitAction} />
      case 'entities': return <Entities entities={entity.entities()} onSelect={setSubEntity} />
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

  function setSubEntity (subentity) {
    setState({ subentity })
  }

  function unsetSubEntity () {
    setSubEntity(null)
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
