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

  xDown = null
  yDown = null

  handleTouchStart = event => {
    this.xDown = event.touches[0].clientX
    this.yDown = event.touches[0].clientY
  }

  handleTouchMove = event => {
    if (!this.xDown || !this.yDown) return

    const xUp = event.touches[0].clientX
    const yUp = event.touches[0].clientY
    const xDiff = this.xDown - xUp
    const yDiff = this.yDown - yUp

    if (Math.abs(xDiff) > Math.abs(yDiff))
      if (xDiff > 0) this.props.onSwipeLeft()
      else this.props.onSwipeRight()
    else if (yDiff > 0) this.props.onSwipeUp()
    else this.props.onSwipeDown()

    this.xDown = null
    this.yDown = null
  }

  render = () =>
    cloneElement(Children.only(this.props.children), {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove
    })
}
