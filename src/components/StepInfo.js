import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import CircularProgress from 'components/CircularProgress'

import arrow from 'assets/2/step-info-back.svg'
import check from 'assets/2/step-info-check.svg'

export default props => {
  const { step, path, paths, children } = props
  const pathIndex = paths.findIndex(item => item === path)
  const percent = parseInt(pathIndex / paths.length * 100, 10);

  return (
    <Wrapper>
      <Title>
        <Back />
        {children}
      </Title>

      <Steps>
        {[1, 2, 3, 4].map(number => (
          <Step key={number} isActive={step === number} isDone={step > number}>
            <CircularProgress value={step === number && percent} />
            {number}
          </Step>
        ))}
      </Steps>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  background: #20a134;
  color: white;
`

const Title = styled.div`
  align-self: stretch;

  margin-top: 33px;
  padding: 0 18px;

  position: relative;

  color: white;
  font-size: 24px;
  letter-spacing: -0.6px;
  text-align: center;
  line-height: 24px;
  text-shadow: 0 1px 1px ${rgba('black', 0.2)};
`

const Steps = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 14px auto;
`

const Step = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28px;
  height: 28px;
  padding-top: 2px;

  background: ${props => rgba('white', props.isDone ? 1 : props.isActive ? 0.4 : 0)};
  border: 1px solid ${props => rgba('white', props.isDone || props.isActive ? 1 : 0.4)};
  border-radius: 50%;
  box-shadow: 0 0 0 ${props => (props.isActive ? '6px' : 0)} ${rgba('white', 0.2)};

  position: relative;

  font-size: 18px;
  letter-spacing: 0;

  transition: 0.3s;

  &::before {
    content: url('${check}');
    position: absolute;
    top: 4px;
    transition: 0.3s;
    opacity: ${props => (props.isDone ? 1 : 0)};
    transform: scale(${props => (props.isDone ? 1 : 0.5)});
  }

  &:not(:last-child) {
    margin-right: 19px;

    &::after {
      content: '';

      display: block;
      width: 19px;
      height: 1px;

      position: absolute;
      left: 27px;
      top: 50%;
      transform: translateY(-50%);

      background: ${props => rgba('white', props.isDone ? 1 : 0.4)};
      transition: 0.3s;
    }
  }
`

const Back = styled.img.attrs({ src: arrow, alt: '' })`
  position: absolute;
  top: 4px;
  left: 18px;
  cursor: pointer;
`
