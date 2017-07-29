
const template = `
<nav class="c-nav c-nav--light o-panel">
  <div>
    <div v-bind:class="{ 'c-nav__item--active': active === 'properties' }" v-on:click="change('properties')" class="c-nav__item">
      <i class='fa fa-list-alt fa-fw' /> Properties
    </div>
    <div v-bind:class="{ 'c-nav__item--active': active === 'links' }" v-on:click="change('links')" class="c-nav__item">
      <i class='fa fa-link fa-fw' /> Links
    </div>
    <div v-bind:class="{ 'c-nav__item--active': active === 'actions' }" v-on:click="change('actions')" class="c-nav__item">
      <i class='fa fa-flash fa-fw' /> Actions
    </div>
    <div v-bind:class="{ 'c-nav__item--active': active === 'entities' }" v-on:click="change('entities')" class="c-nav__item">
      <i class='fa fa-sitemap fa-fw' /> Entities
    </div>
    <div v-if="!subentity" v-bind:class="{ 'c-nav__item--active': active === 'raw' }" v-on:click="change('raw')" class="c-nav__item">
      <i class='fa fa-code fa-fw' /> Raw
    </div>
  </div>
  <div v-if="subentity" class="c-nav__item c-nav__item--active c-nav__item--error c-nav--bottom" v-on:click="unset()">
    <i class='fa fa-window-close fa-fw' /> Back to Parent Entity
  </div>
</nav>
`

export default {
  props: {
    active: {
      type: String,
      required: true
    },
    subentity: Boolean
  },

  template: template,

  methods: {
    change (page) {
      this.$emit('change', page)
    },

    unset () {
      this.$emit('unset')
    }
  }
}
