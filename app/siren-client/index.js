
/**
 * Module dependencies.
 */

import Entity from '../siren-entity'
import { EventEmitter } from 'events'

/**
 * A siren API client. Emits the following events:
 *
 *  - error(err)      After an error has occurred.
 *  - entity(entity)  After an entity/action has been retrieved.
 *
 * @constructor
 * @param {String} [href]  An entry-point href.
 */
class Client extends EventEmitter {
  constructor (href) {
    super()
    if (href) this.get(href)
  }

  /**
   * Requests the entity at the given URL. Use this API as your entrypoint.
   *
   * @param {String} href  The URL to request.
   * @return {Promise}     The entity from the response.
   */
  get (href) {
    return this.request(href, 'GET')
  }

  /**
   * Given a siren resource, fetch the resource at the specified href.
   *
   * @param {Object} link  A siren object that has an href. (eg: link)
   * @return {Promise}     The entity from the response.
   */
  follow (link) {
    return this.get(link.href)
  }

  /**
   * Submit the `action` and set the response as the new current entity.
   *
   * @param {Object} action  A siren action object.
   * @param {Object} [data]  Serialized data representing the action fields.
   * @return {Promise}       The entity from the response.
   */
  submit (action, data) {
    let href = action.href
    let method = normalizeMethod(action.method)

    let body = null
    let contentType = null
    if (method === 'GET') {
      body = params(data)
    } else if (action.type === 'application/json') {
      contentType = 'application/json'
      body = JSON.stringify(data)
    } else {
      contentType = 'application/x-www-form-urlencoded'
      body = params(data)
    }

    return this.request(href, method, body, contentType)
  }

  /**
   * Factory for superagent requests.
   *
   * @param  {String} href    The resource URL.
   * @param  {String} method  The HTTP method name.
   * @return {Promise}        The entity from the response.
   */
  request (href, method, body, contentType) {
    const params = {
      credentials: 'include',
      method: method,
      body: body,
      headers: {
        accept: 'application/vnd.siren+json',
        'content-type': contentType
      }
    }

    return window.fetch(href, params)
      .then(res => this.handle(res))
      .catch(err => this.emit('error', err))
  }

  /**
   * Internal function for handling a Fetch API response. It will either emit
   * an "entity" event, or reject the promise, which will emit an "error" event.
   *
   * @private
   * @param {window.Response} res  Fetch API response
   */
  handle (res) {
    console.log(res)
    if (res.headers.get('content-type') !== 'application/vnd.siren+json') {
      return Promise.reject(new Error('did not find a valid siren response'))
    } else {
      return res.json().then(body => {
        this.emit('entity', new Entity(body), res.url)
      })
    }
  }
}

export default Client

function normalizeMethod (input) {
  return (input || 'get').toUpperCase()
}

function params (input) {
  let p = new window.URLSearchParams()
  Object.keys(input).forEach(key => p.set(key, input[key]))
  return p
}
