/** @jsx element */

import element from 'virtual-element'

export function render ({ props }) {
  const { error, onClose } = props

  return (
    <div class='u-window-box--large'>
      <div class='c-alert c-alert--error'>
        <button class='c-button c-button--close' onClick={handleClick}>×</button>
        {error.message}
      </div>
    </div>
  )

  function handleClick (e) {
    e.preventDefault()
    if (onClose) onClose()
  }
}
