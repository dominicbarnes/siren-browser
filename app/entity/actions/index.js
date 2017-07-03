/** @jsx element */

import element from 'virtual-element'
import { Form, InputField } from 'deku-forms'

export function render ({ props }) {
  const { actions, onAction } = props

  if (actions.length === 0) {
    return (
      <div class='c-alert c-alert--warning'>
        No actions to show.
      </div>
    )
  }

  const cards = actions.map((action) => {
    const { href, fields, method, title } = action
    const classes = action.class ? action.class.map(cls => <span class='c-badge'>{cls}</span>) : null

    let body = (fields || []).map(field => {
      let { name, title, type, value } = field

      return (
        <InputField
          class='c-field-element'
          controlClass='c-field'
          label={title || name}
          labelClass='c-label'
          name={name}
          type={type}
          value={value} />
      )
    })

    return (
      <Form class='c-card' action={href} method={method} onSubmit={handleSubmit}>
        <header class='c-card__header'>
          <h2 class='c-heading c-heading--medium'>{title}</h2>
        </header>
        <div class='c-card__body'>
          {classes}
          {body}
        </div>
        <footer class='c-card__footer'>
          <button class='c-button c-button--block c-button--brand' type='submit'>Submit</button>
        </footer>
      </Form>
    )

    function handleSubmit (data) {
      if (onAction) onAction(action, data)
    }
  })

  const cells = cards.map(card => {
    return (
      <div class='o-grid__cell o-grid__cell--width-33'>
        <div class='u-window-box--medium'>
          {card}
        </div>
      </div>
    )
  })

  return (
    <div class='o-grid o-grid--wrap o-grid--no-gutter'>
      {cells}
    </div>
  )
}
