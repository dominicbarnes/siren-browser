
export default {
  props: {
    active: {
      type: String,
      required: true
    },
    subentity: Boolean
  },

  render () {
    const { active, subentity } = this.$props

    return (
      <nav class='c-nav c-nav--light o-panel'>
        <div>
          <div class={classes('properties')} onClick={this.handleChange.bind(this, 'properties')}>
            <i class='fa fa-list-alt fa-fw' /> Properties
          </div>
          <div class={classes('links')} onClick={this.handleChange.bind(this, 'links')}>
            <i class='fa fa-link fa-fw' /> Links
          </div>
          <div class={classes('actions')} onClick={this.handleChange.bind(this, 'actions')}>
            <i class='fa fa-flash fa-fw' /> Actions
          </div>
          <div class={classes('entities')} onClick={this.handleChange.bind(this, 'entities')}>
            <i class='fa fa-sitemap fa-fw' /> Entities
          </div>
          <div class={classes('raw')} onClick={this.handleChange.bind(this, 'raw')}>
            <i class='fa fa-code fa-fw' /> Raw
          </div>
        </div>
        {bottomNav.call(this)}
      </nav>
    )

    function bottomNav () {
      if (!subentity) return null

      return (
        <div class={classes(true, 'c-nav__item--error c-nav--bottom')} onClick={this.handleUnset}>
          <i class='fa fa-window-close fa-fw' /> Back to Parent Entity
        </div>
      )
    }

    function classes (page, extra) {
      return [
        'c-nav__item',
        { 'c-nav__item--active': page === true || page === active },
        extra
      ]
    }
  },

  methods: {
    handleChange (page) {
      this.$emit('change', page)
    },

    handleUnset () {
      this.$emit('unset')
    }
  }
}
