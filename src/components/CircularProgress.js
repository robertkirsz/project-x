import React from 'react'
import styled from 'styled-components'

const CircularProgress = ({ value }) => (
  <Svg viewBox="0 0 32 32" hasValue={value > 0}>
    <Circle r="16" cx="16" cy="16" strokeLinecap="round" strokeDasharray={`${value} 100`} />
  </Svg>
)

CircularProgress.defaultProps = { value: 0 }

export default CircularProgress

const Svg = styled.svg`
  width: calc(100% + 2px);
  height: calc(100% + 2px);

  position: absolute;
  top: -1px;
  left: -1px;

  opacity: ${props => props.hasValue ? 1 : 0};
  transform: rotate(-180deg);
  overflow: visible;
  transition: 0.3s;
`

const Circle = styled.circle`
  fill: none;
  stroke: white;
  stroke-width: 4px;

  transition: 0.3s;
`
