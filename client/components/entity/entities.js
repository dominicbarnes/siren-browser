
import RelBadge from './rel-badge'

const template = `
<div>
  <div v-if="empty" class="c-alert c-alert--warning">
    No actions to show.
  </div>

  <div class="o-grid o-grid--wrap o-grid--no-gutter">
    <div v-for="entity in entities" class="o-grid__cell o-grid__cell--width-33">
      <div class="u-window-box--medium">
        <div class="c-card">
          <header class="c-card__header">
            <h2 class="c-heading">{{ entity.title() || '(untitled)' }}</h2>
          </header>
          <div class="c-card__body">
            <span v-for="cls in entity.class" class="c-badge">{{ cls }}</span>
            <rel-badge v-for="rel in entity.rel()" v-bind:rel="rel" />
          </div>
          <footer class="c-card__footer">
            <button v-on:click="change(entity)" class="c-button c-button--block c-button--brand">
              Open
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>
`

export default {
  props: {
    entities: {
      type: Array,
      required: true
    }
  },

  template: template,

  computed: {
    empty () {
      return this.entities.length === 0
    }
  },

  methods: {
    change (entity) {
      this.$emit('change', entity)
    }
  },

  components: { RelBadge }
}
