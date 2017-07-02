/** @jsx element */

import element from 'magic-virtual-element'

export const defaultProps = {
  active: 'start'
}

export function render ({ props }) {
  const { active, entity, subentity, onChange, onUnset } = props

  return (
    <nav class='c-nav c-nav--light o-panel'>
      {topNav(subentity || entity)}
      {bottomNav()}
    </nav>
  )

  function topNav (entity) {
    if (!entity) return null

    return (
      <div>
        <div class={classes('properties')} onClick={handleChange('properties')}><i class='fa fa-list-alt fa-fw' /> Properties</div>
        <div class={classes('links')} onClick={handleChange('links')}><i class='fa fa-link fa-fw' /> Links</div>
        <div class={classes('actions')} onClick={handleChange('actions')}><i class='fa fa-flash fa-fw' /> Actions</div>
        <div class={classes('entities')} onClick={handleChange('entities')}><i class='fa fa-sitemap fa-fw' /> Entities</div>
        {!subentity ? <div class={classes('raw')} onClick={handleChange('raw')}><i class='fa fa-code fa-fw' /> Raw</div> : null}
      </div>
    )
  }

  function bottomNav () {
    return (
      <div class='c-nav--bottom'>
        {subentity ? <div class={classes(true, 'c-nav__item--error')} onClick={onUnset}><i class='fa fa-window-close fa-fw' /> Back to Parent Entity</div> : null}
      </div>
    )
  }

  function handleChange (page) {
    if (!onChange) return null
    return () => onChange(page)
  }

  function classes (page, extra) {
    return [
      'c-nav__item',
      { 'c-nav__item--active': page === true || page === active },
      extra
    ]
  }
}