
import element from 'virtual-element';
import isAbsoluteUrl from 'is-absolute-url';
import open from '../../lib/open';

export function render({ props }) {
  const { rel } = props;

  return isAbsoluteUrl(rel)
    ? <a href={rel} class="c-badge c-badge--brand" onClick={open}>{rel}</a>
    : <span class="c-badge c-badge--success">{rel}</span>;
}
