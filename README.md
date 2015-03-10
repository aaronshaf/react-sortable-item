# react-sortable-item

Reorder elements in a list. Uses the native HTML5 Drag and Drop API.

See [example](http://aaronshaf.github.io/react-sortable-item/).

This library is different from other react-sortable libraries in that it treats the reindexing strategy as an implementation detail of the drop event. This makes managing your list state easier. It also makes it easier to accept data from other sources (other windows, files from your desktop, etc).

## Install

```base
npm install react-sortable-item
```

## Example

```javascript
import SortableItem from 'react-sortable-item'

var ExampleSortableList = React.createClass({
  handleDrop(dropPath, position, event) {},

  handleAcceptTest(event) {},

  render() {
    var list = yourRecords.map((record) => {
      return (
        <SortableItem
            key={record.id}
            type={record.type}
            data={record.path}
            handleDrop={this.handleDrop}
            handleAcceptTest={this.handleAcceptTest}>
          <li>
            <div className="li-inner">
              {record.label}
            </div>
          </li>
        </SortableItem>
      )
    })
    return (
      <ul>
        {list}
      </ul>
    )
  }
})
```

## License

MIT
