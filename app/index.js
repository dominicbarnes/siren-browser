/** @jsx element */

import element from 'magic-virtual-element'
import store from 'store'
import SirenClient from './siren-client'

import * as Nav from './nav'
import * as Error from './error'
import * as Start from './start'
import * as Entity from './entity'

const client = new SirenClient()

export function initialState () {
  return {
    page: 'start',
    lastHref: store.get('lastHref')
  }
}

export function afterMount (component, el, setState) {
  client.on('error', (error) => setState({ error }))
  client.on('entity', (entity, href) => {
    store.set('lastHref', href)
    console.log('entity', href, entity.toObject())
    setState({
      lastHref: href,
      entity: entity,
      page: 'entity',
      error: null,
      subentity: null
    })
  })
}

export function render ({ state }, setState) {
  const { page, entity, error, lastHref } = state

  return (
    <div class='c-text'>
      {error ? <Error error={error} onClose={clearError} /> : null}
      {entity ? <Nav entity={entity} onRefresh={refresh} onStart={() => changeNav('start')} /> : null}
      {content()}
    </div>
  )

  function content () {
    switch (page) {
      case 'entity': return <Entity entity={entity} onLink={followLink} onAction={submitAction} />
      case 'start': return <Start initialValue={lastHref} onSubmit={followLink} />
    }
  }

  function refresh () {
    followLink(lastHref)
  }

  function changeNav (page) {
    setState({ page, entity: null })
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
}
