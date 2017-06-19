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

  return table(properties)
}

function table (object) {
  const rows = Object.keys(object).sort().map(key => {
    return { key, value: object[key] }
  })

  return (
    <table class='c-table'>
      <tbody class='c-table__body'>
        {rows.map(row)}
      </tbody>
    </table>
  )
}

function row ({ key, value }) {
  return (
    <tr class='c-table__row'>
      <th class='c-table__cell'>{key}</th>
      <td class='c-table__cell'>{cell(value)}</td>
    </tr>
  )
}

function cell (input) {
  if (!input) {
    return JSON.stringify(input)
  } else if (typeof input === 'object') {
    return table(input)
  } else {
    return input
  }
}
