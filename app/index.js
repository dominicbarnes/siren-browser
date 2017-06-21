/** @jsx element */

import element from 'virtual-element'
import SirenClient from './siren-client'
import * as Nav from './nav'
import * as Error from './error'
import * as Start from './start'
import * as Properties from './entity/properties'
import * as Links from './entity/links'
import * as Actions from './entity/actions'
import * as Entities from './entity/entities'

const client = new SirenClient()

export function initialState () {
  return { page: 'start' }
}

export function afterMount (component, el, setState) {
  client.on('error', (error) => setState({ error }))
  client.on('entity', (entity, href) => {
    console.log('entity', href, entity.toObject())
    setState({
      entity: entity,
      lastHref: href,
      error: null,
      subentity: null
    })
  })
}

export function render ({ state }, setState) {
  const { error, page, entity, subentity } = state

  return (
    <div class='c-text'>
      <div class='o-grid o-grid--no-gutter o-panel'>
        <div class='o-grid__cell--width-25 o-grid__cell--width-15@large o-panel-container'>
          <Nav active={page} entity={entity} subentity={subentity} onChange={changeNav} onUnset={unsetSubEntity} />
        </div>
        <div class='o-grid__cell--width-75 o-grid__cell--width-85@large o-panel-container'>
          <div class='o-panel'>
            {error ? <Error error={error} onClose={clearError} /> : null}
            <div class='u-window-box--medium'>{content(subentity || entity)}</div>
          </div>
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
    console.log('following link', url)
    client.get(url)
  }

  function submitAction (action, data) {
    console.log('submitting action', action, data)
    client.submit(action, data)
  }

  function setSubEntity (subentity) {
    setState({ subentity })
  }

  function unsetSubEntity () {
    setSubEntity(null)
  }
}
