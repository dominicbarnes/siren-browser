
export default {
  props: {
    actions: {
      type: Array,
      required: true
    }
  },

  render () {
    const { actions } = this.$props

    if (actions.length === 0) {
      return (
        <div class='c-alert c-alert--warning'>
          No actions to show.
        </div>
      )
    }

    const cards = actions.map((action) => {
      const { href, fields, method, title } = action
      const classes = action.class ? action.class.map(cls => <span class='c-badge'>{cls}</span>) : null

      let body = (fields || []).map(field => {
        let { name, title, type, value } = field

        return (
          <label class='c-label o-form-element'>
            {title || name}
            <input class='c-field c-field--label' name={name} type={type} value={value} />
          </label>
        )
      })

      return (
        <form class='c-card' action={href} method={method} onSubmit={this.handleSubmit.bind(this, action)}>
          <header class='c-card__header'>
            <h2 class='c-heading c-heading--medium'>{title}</h2>
          </header>
          <div class='c-card__body'>
            {classes}
            {body}
          </div>
          <footer class='c-card__footer'>
            <button class='c-button c-button--block c-button--brand' type='submit'>Submit</button>
          </footer>
        </form>
      )
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
  },

  methods: {
    handleSubmit (action, e) {
      e.preventDefault()
      const data = new window.FormData(e.target)
      this.$emit('action', Object.assign(Object.create(null), action), data)
    }
  }
}
