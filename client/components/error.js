
export default {
  props: {
    error: {
      type: Error,
      required: true
    }
  },

  render () {
    const { error } = this.$props

    return (
      <div class='c-alerts c-alerts--topright'>
        <div class='c-alert c-alert--error'>
          <button class='c-button c-button--close' onClick={this.handleClose}>×</button>
          {error.message}
        </div>
      </div>
    )
  },

  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
