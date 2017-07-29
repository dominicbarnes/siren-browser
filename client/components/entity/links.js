
import RelBadge from './rel-badge'

const template = `
<div>
  <div v-if="empty" class="c-alert c-alert--warning">
    No links to show.
  </div>

  <div class="o-grid o-grid--wrap o-grid--no-gutter">
    <div v-for="link in links" class='o-grid__cell o-grid__cell--width-33'>
      <div class='u-window-box--medium'>
        <div class="c-card">
          <header class="c-card__header">
            <h2 class="c-heading">{{ link.title || '(untitled)' }}</h2>
          </header>
          <div class="c-card__body">
            <span v-for="cls in link.class" class="c-badge">{{ cls }}</span>
            <rel-badge v-for="rel in link.rel" v-bind:rel="rel" />
          </div>
          <footer class="c-card__footer">
            <a v-bind:href="link.href" v-on:click.prevent="follow(link)" class="c-button c-button--block c-button--brand">
              Follow
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</div>
`

export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  },

  template: template,

  computed: {
    empty () {
      return this.links.length === 0
    }
  },

  methods: {
    follow (link) {
      this.$emit('link', link)
    }
  },

  components: { RelBadge }
}
