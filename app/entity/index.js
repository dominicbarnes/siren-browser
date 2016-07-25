
import element from 'magic-virtual-element';
import * as Properties from './properties';
import * as Links from './links';
import * as Actions from './actions';
import * as Entities from './entities';

export function initialState() {
  return { tab: 'properties' };
}

export function afterUpdate({ props }, prevProps, prevState, setState) {
  if (props.entity !== prevProps.entity) setState({ tab: 'properties' });
}

export function render({ props, state }, setState) {
  const { entity, onLink, onAction } = props;
  const { tab } = state;

  const title = entity.title();
  const classes = entity.class().map(cls => <span class="c-badge">{cls}</span>);
  const properties = entity.properties();
  const links = entity.links();
  const entities = entity.entities();
  const actions = entity.actions();

  return (
    <div class="u-pillar-box--large">
      <h1 class="c-heading c-heading--large">{title}</h1>
      {classes}
      <div class="c-tabs">
        <div class="c-tabs__headings">
          <div class={[ 'c-tab-heading', { 'c-tab-heading--active': tab === 'properties' } ]} onClick={selectTab('properties')}>Properties</div>
          <div class={[ 'c-tab-heading', { 'c-tab-heading--active': tab === 'links' } ]} onClick={selectTab('links')}>Links</div>
          <div class={[ 'c-tab-heading', { 'c-tab-heading--active': tab === 'actions' } ]} onClick={selectTab('actions')}>Actions</div>
          <div class={[ 'c-tab-heading', { 'c-tab-heading--active': tab === 'entities' } ]} onClick={selectTab('entities')}>Entities</div>
        </div>
        <div class={[ 'c-tabs__tab', { 'c-tabs__tab--active': tab === 'properties' } ]}>
          <Properties properties={properties} />
        </div>
        <div class={[ 'c-tabs__tab', { 'c-tabs__tab--active': tab === 'links' } ]}>
          <Links links={links} onLink={onLink} />
        </div>
        <div class={[ 'c-tabs__tab', { 'c-tabs__tab--active': tab === 'actions' } ]}>
          <Actions actions={actions} onAction={onAction} />
        </div>
        <div class={[ 'c-tabs__tab', { 'c-tabs__tab--active': tab === 'entities' } ]}>
          <Entities entities={entities} onLink={onLink} onAction={onAction} />
        </div>
      </div>
    </div>
  );

  function selectTab(tab) {
    return () => setState({ tab });
  }
}
