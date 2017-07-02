/** @jsx element */

import element from 'virtual-element'

export function render ({ props }) {
  const { entity, onRefresh, onStart } = props

  return (
    <div class='c-nav c-nav--inline c-nav--top'>
      <div class='c-nav__content'>{entity ? entity.title() : null}</div>
      <div class='c-nav__item--right'>
        <div class='c-nav__item'>
          <i class='fa fa-refresh' onClick={onRefresh} />
          {' Refresh'}
        </div>
        <div class='c-nav__item c-nav__item--success' onClick={onStart}>
          <i class='fa fa-map fa-fw' />
          {' Navigate'}
        </div>
      </div>
    </div>
  )
}
