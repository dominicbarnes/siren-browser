
import Entity from '../../siren-entity'
import Nav from './nav'
import Properties from './properties'
import Links from './links'
import Actions from './actions'
import Entities from './entities'
import Raw from './raw'

export default {
  props: {
    entity: {
      type: Entity,
      required: true
    }
  },

  data () {
    return { active: 'properties', subentity: null }
  },

  watch: {
    entity () {
      this.$data.active = 'properties'
    }
  },

  render () {
    const { active, subentity } = this.$data
    const { entity } = this.$props

    return (
      <div>
        <div class='c-nav c-nav--inline c-nav--top'>
          <div class='c-nav__content'>{entity ? entity.title() : null}</div>
          <div class='c-nav__item--right'>
            <div class='c-nav__item' onClick={this.onRefresh}>
              <i class='fa fa-refresh' /> Refresh
            </div>
            <div class='c-nav__item c-nav__item--success' onClick={this.onStart}>
              <i class='fa fa-map fa-fw' /> Navigate
            </div>
          </div>
        </div>
        <div class='o-grid o-grid--no-gutter o-panel o-panel--nav-top'>
          <div class='o-grid__cell--width-25 o-grid__cell--width-15@large o-panel-container'>
            <Nav active={active} subentity={!!subentity} onChange={this.setActive} onUnset={this.unsetSubEntity} />
          </div>
          <div class='o-grid__cell--width-75 o-grid__cell--width-85@large o-panel-container'>
            <div class='o-panel'>
              <div class='u-window-box--medium'>
                {content.call(this, subentity || entity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    function content (entity) {
      switch (active) {
        case 'properties': return <Properties properties={entity.properties()} />
        case 'links': return <Links links={entity.links()} onLink={this.onLink} />
        case 'actions': return <Actions actions={entity.actions()} onAction={this.onAction} />
        case 'entities': return <Entities entities={entity.entities()} onChange={this.setSubEntity} />
        case 'raw': return <Raw entity={entity} />
        default: throw new Error('unrecognized page: ' + active)
      }
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
    unsetSubEntity (subentity) {
      this.$data.active = 'properties'
      this.$data.subentity = null
    },
    onStart () {
      this.$emit('start')
    },
    onRefresh () {
      this.$emit('refresh')
    },
    onLink (link) {
      this.$emit('link', link)
    },
    onAction (action, data) {
      this.$emit('action', action, data)
    }
  }
}
