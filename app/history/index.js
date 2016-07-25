
import element from 'virtual-element';

export function render({ props }) {
  const { history, onSelect, onClear } = props;

  const items = history.slice().reverse().map(item => {
    const { href, entity } = item;

    return (
      <li class="c-nav__item c-nav__item--primary" onClick={handleSelect} title={href}>
        {entity.title() || href}
      </li>
    );

    function handleSelect(e) {
      e.preventDefault();
      if (onSelect) onSelect(item);
    }
  });

  return (
    <ul class="c-nav">
      <li class="c-nav__content">
        <button class="c-button c-button--close" onClick={handleClear}>×</button>
        History
      </li>
      {items}
    </ul>
  );

  function handleClear(e) {
    e.preventDefault();
    if (onClear) onClear();
  }
}
