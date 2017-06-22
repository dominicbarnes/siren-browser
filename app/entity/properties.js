/** @jsx element */

import element from 'virtual-element'

export function render ({ props }) {
  const { properties } = props

  if (Object.keys(properties).length === 0) {
    return (
      <div class='c-alert c-alert--warning'>
        No properties to show.
      </div>
    )
  }

  return tree(properties)
}

function tree (object) {
  const rows = Object.keys(object).sort().map(key => {
    return { key, value: object[key] }
  })

  return (
    <ol class='c-tree'>
      {rows.map(row)}
    </ol>
  )
}

function row ({ key, value }) {
  return (
    <li class='c-tree__item'>
      <b>{key}:</b>
      <span>{' '}{cell(value)}</span>
    </li>
  )
}

function cell (input) {
  if (!input) {
    return JSON.stringify(input)
  } else if (typeof input === 'object') {
    return tree(input)
  } else {
    return input
  }
}
