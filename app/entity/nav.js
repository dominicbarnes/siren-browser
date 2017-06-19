/** @jsx element */

import element from 'magic-virtual-element'

export const defaultProps = {
  active: 'properties'
}

export function render ({ props }) {
  const { entity, active, onChange } = props

  const title = entity.title() || '(untitled)'

  return (
    <nav class='c-nav c-nav--light o-panel'>
      <div class='c-nav__content'>{title}</div>
      <div class={classes('properties')} onClick={handleChange('properties')}><i class='fa fa-list-alt fa-fw' /> Properties</div>
      <div class={classes('links')} onClick={handleChange('links')}><i class='fa fa-link fa-fw' /> Links</div>
      <div class={classes('actions')} onClick={handleChange('actions')}><i class='fa fa-flash fa-fw' /> Actions</div>
      <div class={classes('entities')} onClick={handleChange('entities')}><i class='fa fa-sitemap fa-fw' /> Entities</div>
    </nav>
  )

  function handleChange (page) {
    if (!onChange) return null
    return () => onChange(page)
  }

  function classes (page, disabled) {
    return [
      disabled ? 'c-nav__content' : 'c-nav__item',
      { 'c-nav__item--active': !disabled && page === active }
    ]
  }
}
