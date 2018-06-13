import styled from 'styled-components'

import check from 'assets/check.svg'

const content = props => {
  if (props.isDone) return `url(${check})`
  if (props.isActive) return `'${props.number}'`
  return `''`
}

const background = props => {
  if (props.isActive || props.isDone) return '#F39100'
  return 'white'
}

const borderColor = props => {
  if (props.isActive || props.isDone) return '#F39100'
  return '#CACACA'
}

export default styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin: 36px 16px 16px;
`

export const Step = styled.div`
  display: flex;
  position: relative;
  color: #1f1a15;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 26px;

  &:not(:first-child) {
    margin-top: 36px;
  }

  &::before {
    content: ${content};

    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    z-index: 2;

    width: 24px;
    height: 24px;
    margin-right: 16px;

    background: ${background};
    border: 2px solid ${borderColor};
    border-radius: 50%;

    color: white;
  }

  &:not(:first-child)::after {
    content: '';

    display: block;
    width: 2px;
    height: 38px;

    position: absolute;
    left: 11px;
    bottom: 100%;
    z-index: 3;

    background: ${borderColor};
  }
`
