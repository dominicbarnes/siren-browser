
const template = `
<div>
  <div v-if="empty" class="c-alert c-alert--warning">
    No properties to show.
  </div>

  <ol class="c-tree">
    <li v-for="(value, key) in properties" class="c-tree__item">
      <b>{{ key }}:</b>
      <span>{{ value }}</span>
    </li>
  </ol>
</div>
`

export default {
  props: {
    properties: {
      type: Object,
      required: true
    }
  },

  template: template,

  computed: {
    empty () {
      return Object.keys(this.properties).length === 0
    }
  }
}
