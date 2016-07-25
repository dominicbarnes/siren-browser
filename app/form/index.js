
import element from 'virtual-element';
import { Form, InputField } from 'deku-forms';

export function render({ props }) {
  const { initialValue, onSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <div style="background-color: #adadad; color: white;">
        <InputField
          class="c-form-element u-window-box--large"
          controlClass="c-field c-field--large"
          controlsClass="c-input-group"
          id="siren-url"
          label="URL"
          labelClass="c-label"
          name="url"
          placeholder="http://example.com/"
          required
          type="url"
          value={initialValue} />
      </div>
    </Form>
  );

  function handleSubmit(data) {
    if (onSubmit) onSubmit(data.url);
  }
}
