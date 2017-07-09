
export default {
  props: {
    href: String
  },

  render () {
    const { href } = this.$props

    return (
      <form class='u-window-box--medium' onSubmit={this.handleSubmit}>
        <div class='o-form-element'>
          <label class='c-label' for='start-url'>URL</label>
          <input class='c-field c-field--large' name='url' id='start-url' placeholder='http://example.com/' type='url' required value={href} />
          <div class='c-hint c-hint--static'>
            Enter an absolute URL that will serve as the starting point for your browsing session.
            Once you start browsing, you will follow links and submit action forms to continue navigation.
          </div>
        </div>
        <button class='c-button c-button--brand u-large' type='submit'>
          <i class='fa fa-play fa-fw' /> Start
        </button>
      </form>
    )
  },

  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const data = new window.FormData(e.target)
      this.$emit('submit', data.get('url'))
    }
  }
}
