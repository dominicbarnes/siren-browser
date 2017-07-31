
import isAbsoluteUrl from 'is-absolute-url'
import open from '../../../lib/open'

export default {
  props: {
    rel: {
      type: String,
      required: true
    }
  },

  render (h) {
    const { rel } = this.$props

    if (isAbsoluteUrl(rel)) {
      const data = {
        attrs: { href: rel },
        'class': 'c-badge c-badge--brand',
        on: { click: open }
      }
      return h('a', data, [ rel ])
    } else {
      return h('span', { 'class': 'c-badge c-badge--success' }, [ rel ])
    }
  }
}
