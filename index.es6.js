import React from 'react/addons'
import classSet from 'class-set'

var itemBeingDragged

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    handleAcceptTest: React.PropTypes.func.isRequired,
    handleDrop: React.PropTypes.func.isRequired,
    handleDragStart: React.PropTypes.func,
    handleDragOver: React.PropTypes.func,
    handleDragEnd: React.PropTypes.func,
    handleDragLeave: React.PropTypes.func
  },

  getInitialState() {
    return {
      dragging: false,
      hover: false,
      isOverSelf: false,
      hoverAbove: false
    }
  },

  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', this.props.data)
    itemBeingDragged = React.findDOMNode(this.refs.item)
    this.setState({dragging: true})
    if(this.props.handleDragStart) {
      this.props.handleDragStart(event)
    }
  },

  handleDragOver(event) {
    var isOverSelf = React.findDOMNode(this.refs.item) === itemBeingDragged
    var isOverTopHalf = event.clientY < (event.target.offsetTop + (event.target.offsetHeight / 2))

    this.setState({
      hover: true,
      isOverSelf: isOverSelf,
      hoverAbove: isOverTopHalf
    })

    if(isOverSelf) {
      event.stopPropagation()
      return
    }

    if(!this.props.handleAcceptTest(this.props.data, isOverTopHalf ? 0 : 1, event)) return
    event.preventDefault()

    if(this.props.handleDragOver) {
      this.props.handleDragOver(event)
    }
  },

  handleDragEnd(event) {
    this.setState({dragging: false})
    if(this.props.handleDragEnd) {
      this.props.handleDragEnd(event)
    }
  },

  handleDragLeave(event) {
    this.setState({
      hover: false
    })
    event.preventDefault()
    if(this.props.handleDragLeave) {
      this.props.handleDragLeave(event)
    }
  },

  handleDrop(event) {
    event.stopPropagation()
    event.preventDefault()

    this.setState({
      hover: false
    })

    if(this.state.isOverSelf) {
      return
    }

    this.props.handleDrop(this.props.data, this.state.hoverAbove ? 0 : 1, event)
  },

  render() {
    var classes = classSet(this.props.className, {
      'dragging': this.state.dragging,
      'hover': this.state.hover,
      'hover-above': this.state.hoverAbove,
      'hover-below': !this.state.hoverAbove
    })

    return React.cloneElement(this.props.children, {
      ref: "item",
      draggable: "true",
      className: classes,
      onDragStart: this.handleDragStart,
      onDragOver: this.handleDragOver,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop
    })
  }
})
