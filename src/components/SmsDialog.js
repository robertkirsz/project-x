import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'
import { CSSTransition } from 'react-transition-group'

import { withTexts } from 'providers/TextProvider'
import parseValues from 'utils/parseValues'

const SmsDialog = ({ pin, isVisible, withDash, texts, ...props }) => {
  const sign = withDash ? '-' : ''
  const now = new Date()

  return (
    <CSSTransition in={isVisible} classNames="transition" timeout={500} mountOnEnter unmountOnExit {...props}>
      <Wrapper itemsCenter>
        <Avatar>me</Avatar>

        <Div column mLeft={12}>
          <Title>Meine Finanzen</Title>

          <Subtitle>
            {parseValues(texts.onboarding1.step2.smsCode[0], {
              code: pin.slice(0, pin.length / 2) + sign + pin.slice(pin.length / 2, pin.length)
            })}
          </Subtitle>
        </Div>

        <Time>
          {now.getHours()}:{now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}
        </Time>
      </Wrapper>
    </CSSTransition>
  )
}

export default withTexts(SmsDialog)

const Wrapper = Div.extend`
  position: fixed;
  top: 8px;
  left: 8px;
  right: 8px;
  z-index: 50;

  min-height: 64px;
  padding: 12px;

  background: #fafafa;
  border-radius: 2px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  font-family: Roboto;

  &.transition {
    &-appear,
    &-enter {
      opacity: 0;
      transform: translateY(-100%);
      &-active {
        opacity: 1;
        transform: translateY(0);
        transition: 0.5s;
      }
    }
    &-exit {
      opacity: 1;
      transform: translateY();
      &-active {
        opacity: 0;
        transform: translateY(-100%);
        transition: 0.5s;
      }
    }
  }
`

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.26);
  border-radius: 50%;

  width: 40px;
  height: 40px;

  font-size: 18px;
  color: white;
  line-height: 18px;
  text-transform: uppercase;
`

const Title = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 24px;
`

const Subtitle = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  line-height: 20px;
`

const Time = styled.span`
  align-self: flex-start;
  margin-left: auto;

  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  line-height: 16px;
`
