
import Entity from '../../siren-entity'
import hljs from 'highlight.js'

const template = `
<pre>
  <code class="json" v-html="code"></code>
</pre>
`

export default {
  props: {
    entity: {
      type: Entity,
      required: true
    }
  },

  template: template,

  computed: {
    code () {
      return JSON.stringify(this.entity.toObject(), null, 2)
    }
  },

  mounted () {
    hljs.highlightBlock(this.$el)
  }
}
