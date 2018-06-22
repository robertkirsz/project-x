// A wrapper component that attaches touch/swipe listeners to it's child

import { Component, Children, cloneElement } from 'react'
import PropTypes from 'prop-types'

export default class Swiper extends Component {
  static propTypes = {
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    onSwipeUp: PropTypes.func,
    onSwipeDown: PropTypes.func,
    children: PropTypes.node
  }

  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    onSwipeUp: () => {},
    onSwipeDown: () => {}
  }

  touchStartX = null
  touchStartY = null
  touchMoveX = null
  touchMoveY = null

  // Saves touchStart coordinates
  handleTouchStart = ({ touches }) => {
    this.touchStartX = touches[0].clientX
    this.touchStartY = touches[0].clientY
  }

  // Saves touchMove coordinates
  handleTouchMove = ({ touches }) => {
    this.touchMoveX = touches[0].clientX
    this.touchMoveY = touches[0].clientY
  }

  // Checks a difference between touchStart and touchMove coordinates
  handleTouchEnd = () => {
    // Don't do anything if we didn't move the "cursor"
    if (this.touchMoveX === null || this.touchMoveY === null) return

    // Calculate the distances between touchStart and touchMove points
    const horizontalDifference = this.touchStartX - this.touchMoveX
    const verticalDifference = this.touchStartY - this.touchMoveY

    // If we're swiping horizontally (horizontal swipe distance is bigger than the vertical one)...
    if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
      // Call proper callback depending on the swipe direction
      horizontalDifference > 0 ? this.props.onSwipeLeft() : this.props.onSwipeRight()
    }

    // If we're swiping vertically (horizontal swipe distance is smaller than the vertical one)...
    if (Math.abs(horizontalDifference) < Math.abs(verticalDifference)) {
      // Call proper callback depending on the swipe direction
      verticalDifference > 0 ? this.props.onSwipeUp() : this.props.onSwipeDown()
    }

    // Clear touch coordinates so we can start measuring again
    this.touchStartX = null
    this.touchStartY = null
    this.touchMoveX = null
    this.touchMoveY = null
  }

  render = () =>
    cloneElement(Children.only(this.props.children), {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd
    })
}
