
import Entity from '../../siren-entity'
import hljs from 'highlight.js'

export default {
  props: {
    entity: {
      type: Entity,
      required: true
    }
  },

  render () {
    const { entity } = this.$props

    return (
      <pre>
        <code class='json'>{JSON.stringify(entity.toObject(), null, 2)}</code>
      </pre>
    )
  },

  mounted () {
    hljs.highlightBlock(this.$el)
  }
}
