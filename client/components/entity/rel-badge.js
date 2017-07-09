
import isAbsoluteUrl from 'is-absolute-url'
import open from '../../../lib/open'

export default {
  props: {
    rel: {
      type: String,
      required: true
    }
  },

  render () {
    const { rel } = this.$props

    return isAbsoluteUrl(rel)
      ? <a href={rel} class='c-badge c-badge--brand' onClick={open}>{rel}</a>
      : <span class='c-badge c-badge--success'>{rel}</span>
  }
}
