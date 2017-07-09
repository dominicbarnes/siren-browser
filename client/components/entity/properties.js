
export default {
  props: {
    properties: {
      type: Object,
      required: true
    }
  },

  render (h) {
    const { properties } = this.$props

    if (Object.keys(properties).length === 0) {
      return (
        <div class='c-alert c-alert--warning'>
          No properties to show.
        </div>
      )
    }

    return tree(h, properties, 0)
  }
}

function tree (h, input, level) {
  return (
    <ol class='c-tree'>
      {rows(input).map(r => row(h, r, level))}
    </ol>
  )
}

function row (h, { key, value }, level) {
  const nest = shouldNest(value)

  const classes = {
    'c-tree__item': true,
    'c-tree__item--expandable': nest,
    'c-tree__item--expanded': nest
  }

  return (
    <li class={classes}>
      <b>{key}:</b>
      <span>{' '}{cell(value, level)}</span>
    </li>
  )
}

function rows (input) {
  if (Array.isArray(input)) {
    return input.map((value, key) => {
      return { key, value }
    })
  } else {
    return Object.keys(input).sort().map(key => {
      return { key, value: input[key] }
    })
  }
}

function cell (input, level) {
  return shouldNest(input) ? tree(input, level + 1) : input
}

function shouldNest (input) {
  return input && typeof input === 'object'
}
