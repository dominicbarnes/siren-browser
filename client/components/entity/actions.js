
const template = `
<div>
  <div v-if="empty" class="c-alert c-alert--warning">
    No actions to show.
  </div>

  <div class="o-grid o-grid--wrap o-grid--no-gutter"> 
    <div v-for="action in actions" class="o-grid__cell o-grid__cell--width-33">
      <div class="u-window-box--medium">
        <form class="c-card" v-bind:action="action.href" v-bind:method="action.method" v-on:submit.prevent="submit(action, $event.target)">
          <header class="c-card__header">
            <h2 class="c-heading c-heading--medium">{{ action.title || action.name }}</h2>
          </header>
          <div class="c-card__body">
            <span v-for="cls in action.class" class="c-badge">{{ cls }}</span>
            <label v-for="field in action.fields" v-bind:key="field.name" class="c-label o-form-element">
              {{ field.title || field.name }}
              <input class="c-field c-field--label" v-bind:name="field.name" v-bind:type="field.type" v-bind:value="field.value" />
            </label>
          </div>
          <footer class="c-card__footer">
            <button class="c-button c-button--block c-button--brand" type="submit">
              Submit
            </button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</div>
`

export default {
  props: {
    actions: {
      type: Array,
      required: true
    }
  },

  template: template,

  computed: {
    empty () {
      return this.actions.length === 0
    }
  },

  methods: {
    submit (action, form) {
      const data = new window.FormData(form)
      this.$emit('action', Object.assign(Object.create(null), action), data)
    }
  }
}
