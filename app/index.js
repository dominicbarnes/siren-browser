
import element from 'virtual-element'
import Siren from 'siren-client'
import store from 'store'
import * as Form from './form'
import * as History from './history'
import * as Error from './error'
import * as Entity from './entity'
import request from 'request'

const client = new Siren()
const history = getHistory()

export function initialState () {
  if (history.length > 0) {
    const item = history[history.length - 1]
    console.log('initial entity', item.entity.toObject())
    return { item }
  }

  return {}
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
  const { error, item } = state

  return (
    <div class='c-text'>
      <Form initialValue={item ? item.href : null} onSubmit={followLink} />
      <div class='o-grid o-grid--no-gutter'>
        <div class='o-grid__cell o-grid__cell--width-20'>
          <History history={history} onSelect={handleSelect} onClear={handleClear} />
        </div>
        <div class='o-grid__cell'>
          <div class="u-pillar-box--large">
            {error ? <Error error={error} onClose={handleClose} /> : null}
            {item ? <Entity entity={item.entity} onLink={followLink} onAction={submitAction} /> : null}
          </div>
        </div>
      </div>
    </div>
  )

  function followLink (url) {
    console.log('link', url)
    client.get(url)
  }

  function submitAction (action, data) {
    console.log('action', action, data)
    client.submit(action, data)

    // FIXME: if electron fixes this weird HTTP redirect bug, we can remove this weird/ugly hack
    process.nextTick(ping)
  }

  function handleSelect (item) {
    setState({ item })
  }

  function handleClear (item) {
    removeHistory(item)
    setState({})
  }

  function handleClose () {
    setState({ error: null })
  }
}

function getHistory () {
  if (!store.enabled) return []
  const history = store.get('history')
  if (!history) return []
  history.forEach((item) => item.entity = new Siren.Entity(item.entity))
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

/**
 * Currently, electron has a weird bug with HTTP redirects. Until that is fixed,
 * it seems that making this extra HTTP request off the bat seems to "unclog"
 * the backlog of HTTP requests. Don't ask me why, I don't really get it either.
 *
 * Ideally, this weird "ping" should not need to exist. Also, I've arbitrarily
 * chosen http://example.com/ because this is an electron app, not a server so
 * I can't just request window.location.href but at the same time I'm not sure
 * who else to spam. :(
 *
 * @see https://github.com/electron/electron/issues/7538
 */
function ping () {
  request.head('http://example.com/')
}
