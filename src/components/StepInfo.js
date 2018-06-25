import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'

import routes from 'routes'
import { colors } from 'styles'

import CircularProgress from 'components/CircularProgress'

import arrow from 'assets/2/step-info-back.svg'
import check from 'assets/2/step-info-check.svg'

const pathToTitleMap = {
  'step-1': 'Personal information',
  'step-2': 'Video identification',
  'step-3': 'Account opening',
  'step-4': 'Set up profile picture'
}

export default ({ history, location, props }) => {
  const step = location.pathname.split('/')[2]
  const stepNumber = parseInt(step.slice(-1), 10)
  const paths = routes.filter(route => route.includes('onboarding-2')).filter(route => route.includes(step + '/'))
  const pathIndex = paths.findIndex(item => item === location.pathname)
  const percent = parseInt(((pathIndex + 1) / paths.length) * 100, 10)

  return (
    <Wrapper {...props}>
      <Title>
        <Back onClick={history.goBack} />
        {pathToTitleMap[step]}
      </Title>

      <Steps>
        {[1, 2, 3, 4].map(number => (
          <Step key={number} isActive={stepNumber === number} isDone={stepNumber > number}>
            <CircularProgress value={(stepNumber === number && percent) || 0} />
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

  width: 100%;
  height: 120px;

  position: absolute;
  z-index: 10;

  background: ${colors.green};
  border-radius: 50% 50% 40% 40% / 0 0 10% 10%;

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
  text-transform: lowercase;

  user-select: none;
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
