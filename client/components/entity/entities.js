
import RelBadge from './rel-badge'

export default {
  props: {
    entities: {
      type: Array,
      required: true
    }
  },

  render () {
    const { entities } = this.$props

    if (entities.length === 0) {
      return (
        <div class='c-alert c-alert--warning'>
          No entities to show.
        </div>
      )
    }

    const cards = entities.map(entity => {
      const classes = entity.class().map(cls => <span class='c-badge'>{cls}</span>)
      const rels = entity.rel().map(rel => <RelBadge rel={rel} />)

      return (
        <div class='c-card'>
          <header class='c-card__header'>
            <h2 class='c-heading'>{entity.title() || '(untitled)'}</h2>
          </header>
          <div class='c-card__body'>
            {classes}
            {rels}
          </div>
          <footer class='c-card__footer'>
            <button onClick={this.handleClick.bind(this, entity)} class='c-button c-button--block c-button--brand'>Open</button>
          </footer>
        </div>
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
    handleClick (entity, e) {
      e.preventDefault()
      this.$emit('change', entity)
    }
  }
}
