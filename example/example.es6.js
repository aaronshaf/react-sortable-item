import React from 'react'

// In your code:
// import SortableListItem from 'react-sortable-item'
import SortableItem from '../index.es6'

import findIndex from 'lodash-node/modern/array/findIndex'
import range from 'lodash-node/modern/utility/range'

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
}

var modules = range(10).map((i) => {
  return {
    id: i,
    label: `Module ${i}`,
    path: 'module.' + i,
    type: "text/plain"
  }
})

var ExampleSortableList = React.createClass({
  handleDrop(dropPath, position, event) {
    var data = event.dataTransfer.getData('text/plain')
    var origin = findIndex(modules, module => data === module.path)
    var destination = findIndex(modules, module => dropPath === module.path)
    if(destination > origin) {
      modules.move(origin, destination + position - 1)
    } else {
      modules.move(origin, destination + position)
    }
    update()

    /*
    console.log({
      origin,
      destination,
      position
    })
    */
  },

  handleAcceptTest(event) {
    // var isLink = event.dataTransfer.types.contains("text/uri-list")
    return true
  },

  render: function() {
    var list = modules.map((data) => {
      return (
        <SortableItem
            key={data.id}
            type={data.type}
            data={data.path}
            handleDrop={this.handleDrop}
            handleAcceptTest={this.handleAcceptTest}>
          <li>
            <div className="li-inner">
              {data.label}
            </div>
          </li>
        </SortableItem>
      )
    })
    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
})

function update() {
  React.render(
    <div>
      <h1>react-sortable-item</h1>
      <ExampleSortableList />
    </div>,
    document.getElementById('examples')
  )
}
update()
