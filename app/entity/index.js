/** @jsx element */

import element from 'magic-virtual-element'
import * as Nav from './nav'
import * as Properties from './properties'
import * as Links from './links'
import * as Actions from './actions'
import * as Entities from './entities'

export function initialState () {
  return { page: 'properties' }
}

export function render ({ props, state }, setState) {
  const { entity, onLink, onAction } = props
  const { page } = state

  return (
    <div class='o-grid o-grid--no-gutter o-panel'>
      <div class='o-grid__cell--width-20 o-panel-container'>
        <Nav entity={entity} active={page} onChange={handleChange} />
      </div>
      <div class='o-grid__cell--width-80 o-panel-container u-window-box--medium'>
        {content()}
      </div>
    </div>
  )

  function content () {
    switch (page) {
      case 'properties': return <Properties properties={entity.properties()} />
      case 'links': return <Links links={entity.links()} onLink={handleLink} />
      case 'actions': return <Actions actions={entity.actions()} onAction={handleAction} />
      case 'entities': return <Entities entities={entity.entities()} onLink={handleLink} onAction={handleAction} />
    }
  }

  function handleChange (page) {
    setState({ page })
  }

  function handleLink (href) {
    setState({ page: 'properties' })
    if (onLink) onLink(href)
  }

  function handleAction (action, data) {
    setState({ page: 'properties' })
    if (onAction) onAction(action, data)
  }
}
