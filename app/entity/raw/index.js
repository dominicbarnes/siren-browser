/** @jsx element */

import element from 'virtual-element'
import hljs from 'highlight.js'

export function afterMount (component, el, setState) {
  hljs.highlightBlock(el)
}

export function render ({ props }) {
  const { entity } = props

  return (
    <pre>
      <code class='json'>{JSON.stringify(entity.toObject(), null, 2)}</code>
    </pre>
  )
}
