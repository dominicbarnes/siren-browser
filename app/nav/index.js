/** @jsx element */

import element from 'magic-virtual-element'

export const defaultProps = {
  active: 'start'
}

export function render ({ props }) {
  const { active, history, onChange } = props

  const entityClasses = {
    'c-nav__item': true,
    'c-nav__item--active': active === 'entity'
  }

  const historyClasses = {
    'c-nav__item': true,
    'c-nav__item--active': active === 'history'
  }

  const startClasses = {
    'c-nav__item': true,
    'c-nav__item--success': true,
    'c-nav__item--active': active === 'start',
    'c-nav--bottom': true
  }

  return (
    <nav class='c-nav o-panel'>
      <div class={entityClasses} onClick={handleChange('entity')}><i class='fa fa-anchor fa-fw' /> Explore</div>
      <div class={historyClasses} onClick={handleChange('history')}><i class='fa fa-history fa-fw' /> History <span class='c-badge'>{history.length}</span></div>
      <div class={startClasses} onClick={handleChange('start')}><i class='fa fa-home fa-fw' /> Start</div>
    </nav>
  )

  function handleChange (page) {
    if (!onChange) return null
    return () => onChange(page)
  }
}
