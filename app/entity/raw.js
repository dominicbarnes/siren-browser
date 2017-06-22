/** @jsx element */

import element from 'virtual-element'

export function render ({ props }) {
  const { entity } = props

  return (
    <div class='c-code c-code--multiline'>
      {JSON.stringify(entity.toObject(), null, 2)}
    </div>
  )
}
