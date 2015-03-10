# react-sortable-item

Reorder elements in a list. Uses the native HTML5 Drag and Drop API.

See [example](http://aaronshaf.github.io/react-sortable-item/).

This library is quite different from others in that treats the reindexing strategy as an implementation detail.

## Install

```base
npm install react-sortable-item
```

## Example

```javascript
var ExampleSortableList = React.createClass({
  handleDrop: function(dropPath, position, event) {},

  handleAcceptTest: function(event) {},

  render: function() {
    var list = yourRecords.map(function(record) {
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
      );
    }.bind(this))
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
