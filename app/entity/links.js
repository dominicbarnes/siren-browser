/** @jsx element */

import element from 'virtual-element'
import * as RelBadge from './rel-badge'

export function render ({ props }) {
  const { links, onLink } = props

  if (links.length === 0) {
    return (
      <div class='c-alert c-alert--warning'>
        No links to show.
      </div>
    )
  }

  const cards = links.map(link => {
    const classes = link.class ? link.class.map(cls => <span class='c-badge'>{cls}</span>) : null
    const rels = link.rel.map(rel => <RelBadge rel={rel} />)

    return (
      <div class='c-card'>
        <header class='c-card__header'>
          <h2 class='c-heading'>{link.title || '(untitled)'}</h2>
        </header>
        <div class='c-card__body'>
          {classes}
          {rels}
        </div>
        <footer class='c-card__footer'>
          <a href={link.href} onClick={followLink} class='c-button c-button--block c-button--brand'>Follow</a>
        </footer>
      </div>
    )

    function followLink (e) {
      if (onLink) {
        e.preventDefault()
        onLink(e.target.href)
      }
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
