
import element from 'virtual-element';
import { Form, InputField } from 'deku-forms';

export function render({ props }) {
  const { actions, onAction } = props;

  if (actions.length === 0) {
    return (
      <div class="c-alerts">
        <div class="c-alerts__alert c-alerts__alert--secondary">
          No actions to show.
        </div>
      </div>
    );
  }

  const rows = actions.map((action) => {
    const { href, fields, method, title } = action;

    const classes = action.class ? action.class.map(cls => <span class="c-badge">{rel}</span>) : null;

    let children = (fields || []).map(field => {
      let { name, title, type, value } = field;

      return (
        <InputField
          class="c-field-element"
          controlClass="c-field"
          label={title || name}
          labelClass="c-label"
          name={name}
          type={type}
          value={value} />
      );
    });

    return (
      <Form action={href} method={method} onSubmit={handleSubmit}>
        <h2 class="c-heading c-heading--medium">{title}</h2>
        {classes}
        {children}
        <div class="c-form-element">
          <button class="c-button c-button--primary" type="submit">Submit</button>
        </div>
      </Form>
    );

    function handleSubmit(data) {
      if (onAction) onAction(action, data);
    }
  });

  return <div>{rows}</div>;
}
