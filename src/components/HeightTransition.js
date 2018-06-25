import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class HeightTransition extends Component {
  static propTypes = {
    isActive: PropTypes.bool,
    style: PropTypes.shape({}),
    children: PropTypes.node
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.children && props.children !== state.children) {
      return { children: props.children };
    }

    return null;
  };

  containerRef = createRef();
  childrenRef = createRef();

  state = {
    height: this.props.isActive ? 'auto' : 0,
    children: this.props.children
  };

  getSnapshotBeforeUpdate = () => this.getChildrenHeight();

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isActive !== this.props.isActive) {
      this.doubleUpdate('height', snapshot, this.getChildrenHeight());
    }

    if (!this.props.isActive && prevProps.isActive) {
      this.doubleUpdate('height', snapshot, 0);
    }
  }

  handleTransitionEnd = () => this.setState(({ height }) => ({ height: !height ? 0 : 'initial' }));

  getChildrenHeight = () => this.childrenRef.current.scrollHeight;

  doubleUpdate = (key, firstValue, secondValue) =>
    this.setState({ [key]: firstValue }, () => this.setState({ [key]: secondValue }));

  render() {
    const { style, ...props } = this.props;
    const { children, height } = this.state;

    return (
      <Wrapper {...props} onTransitionEnd={this.handleTransitionEnd} style={{ ...style, height }}>
        <div ref={this.childrenRef}>{children}</div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity 0.2s ease, height 0.5s cubic-bezier(0.23, 1, 0.32, 1);
`;
