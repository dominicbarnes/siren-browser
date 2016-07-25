
import element from 'virtual-element';

export function render({ props }) {
  const { links, onLink } = props;

  if (links.length === 0) {
    return (
      <div class="c-alerts">
        <div class="c-alerts__alert c-alerts__alert--secondary">
          No links to show.
        </div>
      </div>
    )
  }

  const rows = links.map(link => {
    const classes = link.class ? link.class.map(cls => <span class="c-badge">{rel}</span>) : null;
    const rels = link.rel.map(rel => <span class="c-badge c-badge--success">{rel}</span>);

    return (
      <tr class="c-table__row">
        <td class="c-table__cell">
          <a class="c-link c-link--primary" href={link.href} title={link.href} onClick={followLink}>
            {link.title || <span class="c-text--quiet">(untitled)</span>}
          </a>
        </td>
        <td class="c-table__cell">
          {classes}
        </td>
        <td class="c-table__cell">
          {rels}
        </td>
      </tr>
    );

    function followLink(e) {
      if (onLink) {
        e.preventDefault();
        onLink(e.target.href);
      }
    }
  });

  return (
    <table class="c-table">
      <thead class="c-table__head">
        <tr class="c-table__row c-table__row--heading">
          <th class="c-table__cell">Link</th>
          <th class="c-table__cell">Classes</th>
          <th class="c-table__cell">Relations</th>
        </tr>
      </thead>
      <tbody class="c-table__body">
        {rows}
      </tbody>
    </table>
  );
}
