/** @jsx element */

import element from 'virtual-element'
import { Form, InputField } from 'deku-forms'

export function render ({ props }) {
  const { initialValue, onSubmit } = props

  return (
    <div class='o-panel'>
      <div class='u-window-box--medium'>
        {form()}
      </div>
    </div>
  )

  function form () {
    return (
      <Form onSubmit={handleSubmit}>
        <InputField
          class='o-form-element'
          controlClass='c-field c-field--large'
          controlsClass='c-input-group'
          id='siren-url'
          label='URL'
          labelClass='c-label'
          hint='Enter an absolute URL that will serve as the starting point for your browsing session. Once you start browsing, you will follow links and submit action forms to continue navigation.'
          hintClass='c-hint c-hint--static'
          name='url'
          placeholder='http://example.com/'
          required
          type='url'
          value={initialValue} />
        <button class='c-button c-button--brand u-large' type='submit'>
          <i class='fa fa-play fa-fw' />
          {' Start'}
        </button>
      </Form>
    )
  }

  function handleSubmit (data) {
    if (onSubmit) onSubmit(data.url)
  }
}
