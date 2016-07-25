
import element from 'virtual-element';
import * as Entity from './';

export function render({ props, state }, setState) {
  const { entities, onLink, onAction } = props;
  const { entity } = state;

  if (entities.length === 0) {
    return (
      <div class="c-alerts">
        <div class="c-alerts__alert c-alerts__alert--secondary">
          No entities to show.
        </div>
      </div>
    )
  }

  const rows = entities.map((entity) => {
    const classes = entity.class().map(cls => <span class="c-badge">{rel}</span>);
    const rels = entity.rel().map(rel => <span class="c-badge c-badge--success">{rel}</span>);

    return (
      <tr class="c-table__row">
        <td class="c-table__cell">
          {entity.title() || '(untitled)'}
        </td>
        <td class="c-table__cell">
          {classes}
        </td>
        <td class="c-table__cell">
          {rels}
        </td>
        <td class="c-table__cell">
          <button type="button" class="c-button c-button--primary c-button--xsmall" onClick={handleOpen}>Open</button>
        </td>
      </tr>
    );

    function handleOpen() {
      setState({ entity });
    }
  });

  return (
    <div>
      {renderEntity()}
      <table class="c-table">
        <thead class="c-table__head">
          <tr class="c-table__row c-table__row--heading">
            <th class="c-table__cell">Entity</th>
            <th class="c-table__cell">Classes</th>
            <th class="c-table__cell">Relations</th>
            <th class="c-table__cell"></th>
          </tr>
        </thead>
        <tbody class="c-table__body">
          {rows}
        </tbody>
      </table>
    </div>
  );

  function renderEntity() {
    if (!entity) return null;

    return (
      <div class="c-overlay">
        <div class="c-modal">
          <header class="c-modal__header">
            <button type="button" class="c-button c-button--close" onClick={closeModal}>×</button>
          </header>
          <div class="c-modal__body">
            <Entity entity={entity} onLink={handleLink} onAction={handleAction} />
          </div>
        </div>
      </div>
    );

    function closeModal() {
      setState({ entity: null });
    }

    function handleLink(href) {
      closeModal();
      if (onLink) onLink(href);
    }

    function handleAction(action, data) {
      closeModal();
      if (onAction) onAction(action, data);
    }
  }
}
