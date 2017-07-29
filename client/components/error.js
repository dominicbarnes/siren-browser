
const template = `
<div class="c-alerts c-alerts--bottomright">
  <div class="c-alert c-alert--error">
    <button class="c-button c-button--close" v-on:click="close">×</button>
    {{ error.message }}
  </div>
</div>
`

export default {
  props: {
    error: {
      type: Error,
      required: true
    }
  },

  template: template,

  methods: {
    close () {
      this.$emit('close')
    }
  }
}
