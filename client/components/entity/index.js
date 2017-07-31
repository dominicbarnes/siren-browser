
import Entity from '../../siren-entity'
import Navigation from './nav'
import Properties from './properties'
import Links from './links'
import Actions from './actions'
import Entities from './entities'
import Raw from './raw'

const template = `
<div>
  <div class="c-nav c-nav--inline c-nav--top">
    <div class="c-nav__content">{{ entity.title() }}</div>
    <div class="c-nav__item--right">
      <div class="c-nav__item" v-on:click="refresh">
        <i class="fa fa-refresh" /> Refresh
      </div>
      <div class="c-nav__item c-nav__item--success" v-on:click="start">
        <i class="fa fa-map fa-fw" /> Navigate
      </div>
    </div>
  </div>
  <div class="o-grid o-grid--no-gutter o-panel o-panel--nav-top">
    <div class="o-grid__cell--width-25 o-grid__cell--width-15@large o-panel-container">
      <navigation v-bind:active="active" v-bind:subentity="!!subentity" v-on:change="setActive" v-on:unset="unsetSubEntity" />
    </div>
    <div class="o-grid__cell--width-75 o-grid__cell--width-85@large o-panel-container">
      <div class="o-panel">
        <div class="u-window-box--medium">
          <properties v-if="active === 'properties'" v-bind:properties="current.properties()" />
          <links v-else-if="active === 'links'" v-bind:links="current.links()" v-on:link="follow" />
          <actions v-else-if="active === 'actions'" v-bind:actions="current.actions()" v-on:action="submit" />
          <entities v-else-if="active === 'entities'" v-bind:entities="current.entities()" v-on:change="setSubEntity" v-on:link="follow" />
          <raw v-else-if="active === 'raw'" v-bind:entity="entity" />
          <div v-else class="c-alert c-alert--error">Unknown Page {{ active }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
`

export default {
  props: {
    entity: {
      type: Entity,
      required: true
    }
  },

  template: template,

  data () {
    return { active: 'properties', subentity: null }
  },

  watch: {
    entity () {
      this.$data.active = 'properties'
      this.$data.subentity = null
    }
  },

  computed: {
    current () {
      return this.$data.subentity || this.entity
    }
  },

  methods: {
    setActive (page) {
      this.$data.active = page
    },
    setSubEntity (subentity) {
      this.$data.active = 'properties'
      this.$data.subentity = subentity
    },
    unsetSubEntity () {
      this.$data.active = 'properties'
      this.$data.subentity = null
    },
    start () {
      this.$emit('start')
    },
    refresh () {
      this.$emit('refresh')
    },
    follow (link) {
      this.$emit('link', link)
    },
    submit (action, data) {
      this.$emit('action', action, data)
    }
  },

  components: { Navigation, Properties, Links, Actions, Entities, Raw }
}
