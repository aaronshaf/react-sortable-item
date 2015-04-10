'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _React = require('react/addons');

var _React2 = _interopRequireWildcard(_React);

var _classSet = require('class-set');

var _classSet2 = _interopRequireWildcard(_classSet);

var itemBeingDragged;

exports['default'] = _React2['default'].createClass({
  displayName: 'index.es6',

  propTypes: {
    className: _React2['default'].PropTypes.string,
    handleAcceptTest: _React2['default'].PropTypes.func.isRequired,
    handleDrop: _React2['default'].PropTypes.func.isRequired,
    handleDragStart: _React2['default'].PropTypes.func,
    handleDragOver: _React2['default'].PropTypes.func,
    handleDragEnd: _React2['default'].PropTypes.func,
    handleDragLeave: _React2['default'].PropTypes.func
  },

  getInitialState: function getInitialState() {
    return {
      dragging: false,
      hover: false,
      isOverSelf: false,
      hoverAbove: false
    };
  },

  handleDragStart: function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', this.props.data);
    itemBeingDragged = _React2['default'].findDOMNode(this.refs.item);
    this.setState({ dragging: true });
    if (this.props.handleDragStart) {
      this.props.handleDragStart(event);
    }
  },

  handleDragOver: function handleDragOver(event) {
    var isOverSelf = _React2['default'].findDOMNode(this.refs.item) === itemBeingDragged;
    var isOverTopHalf = event.clientY < event.target.offsetTop + event.target.offsetHeight / 2;

    this.setState({
      hover: true,
      isOverSelf: isOverSelf,
      hoverAbove: isOverTopHalf
    });

    if (isOverSelf) {
      event.stopPropagation();
      return;
    }

    if (!this.props.handleAcceptTest(this.props.data, isOverTopHalf ? 0 : 1, event)) {
      return;
    }event.preventDefault();

    if (this.props.handleDragOver) {
      this.props.handleDragOver(event);
    }
  },

  handleDragEnd: function handleDragEnd(event) {
    this.setState({ dragging: false });
    if (this.props.handleDragEnd) {
      this.props.handleDragEnd(event);
    }
  },

  handleDragLeave: function handleDragLeave(event) {
    this.setState({
      hover: false
    });
    event.preventDefault();
    if (this.props.handleDragLeave) {
      this.props.handleDragLeave(event);
    }
  },

  handleDrop: function handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      hover: false
    });

    if (this.state.isOverSelf) {
      return;
    }

    this.props.handleDrop(this.props.data, this.state.hoverAbove ? 0 : 1, event);
  },

  render: function render() {
    var classes = _classSet2['default'](this.props.className, {
      dragging: this.state.dragging,
      hover: this.state.hover,
      'hover-above': this.state.hoverAbove,
      'hover-below': !this.state.hoverAbove
    });

    return _React2['default'].cloneElement(this.props.children, {
      ref: 'item',
      draggable: 'true',
      className: classes,
      onDragStart: this.handleDragStart,
      onDragOver: this.handleDragOver,
      onDragEnter: this.handleDragEnter,
      onDragLeave: this.handleDragLeave,
      onDragEnd: this.handleDragEnd,
      onDrop: this.handleDrop
    });
  }
});
module.exports = exports['default'];
