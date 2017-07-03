/** @jsx element */

import element from 'virtual-element'

import * as Actions from './actions'
import * as Entities from './entities'
import * as Links from './links'
import * as Nav from './nav'
import * as Properties from './properties'
import * as Raw from './raw'

export function initialState () {
  return { page: 'properties' }
}

export function afterUpdate ({ props, state }, prevProps, prevState, setState) {
  if (prevProps.entity !== props.entity) {
    setState({ page: 'properties' })
  } else if (prevState.subentity !== state.subentity) {
    setState({ page: 'properties' })
  }
}

export function render ({ props, state }, setState) {
  const { entity, onLink, onAction } = props
  const { page, subentity } = state

  return (
    <div class='o-grid o-grid--no-gutter o-panel o-panel--nav-top'>
      <div class='o-grid__cell--width-25 o-grid__cell--width-15@large o-panel-container'>
        <div>Hello World</div>
        <Nav active={page} entity={entity} subentity={subentity} onChange={changeNav} onUnset={unsetSubEntity} />
      </div>
      <div class='o-grid__cell--width-75 o-grid__cell--width-85@large o-panel-container'>
        <div class='o-panel'>
          <div class='u-window-box--medium'>{content(subentity || entity)}</div>
        </div>
      </div>
    </div>
  )

  function content (entity) {
    switch (page) {
      case 'properties': return <Properties properties={entity.properties()} />
      case 'links': return <Links links={entity.links()} onLink={onLink} />
      case 'actions': return <Actions actions={entity.actions()} onAction={onAction} />
      case 'entities': return <Entities entities={entity.entities()} onSelect={setSubEntity} />
      case 'raw': return <Raw entity={entity} />
    }
  }

  function changeNav (page) {
    setState({ page })
  }

  function setSubEntity (subentity) {
    setState({ subentity })
  }

  function unsetSubEntity (subentity) {
    setState({ subentity: null })
  }
}
