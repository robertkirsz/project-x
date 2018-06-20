import React from 'react'
import styled from 'styled-components'

import getAdjacentRoutePath from 'utils/getAdjacentRoutePath'

const routes = [
  '/',
  '/onboarding-1/intro',
  '/onboarding-1/usp',
  '/onboarding-1/first-login',
  '/onboarding-1/step-1',
  '/onboarding-1/step-1/name',
  '/onboarding-1/step-1/card',
  '/onboarding-1/step-1/contact',
  '/onboarding-1/step-1/birth',
  '/onboarding-1/step-1/residential-address',
  '/onboarding-1/step-1/correspondence-address',
  '/onboarding-1/step-1/tax-information',
  '/onboarding-1/step-1/occupational-status',
  '/onboarding-1/step-1/industry',
  '/onboarding-1/step-1/review',
  '/onboarding-1/step-1/consents',
  '/onboarding-1/step-1/finish',
  '/onboarding-1/step-2',
  '/onboarding-1/step-2/prepare-to-video',
  '/onboarding-1/step-2/connecting',
  '/onboarding-1/step-2/conversation',
  '/onboarding-1/step-2/sms-code',
  '/onboarding-1/step-2/waiting',
  '/onboarding-1/step-2/account-ready',
  '/onboarding-1/step-3',
  '/onboarding-1/step-3/pin-setup',
  '/onboarding-1/step-3/pin-confirm',
  '/onboarding-1/step-3/password-setup',
  '/onboarding-1/step-3/email-confirm'
]

export default props => {
  const currentPath = props.location.pathname
  const previousPath = getAdjacentRoutePath(currentPath, 'previous', routes)
  const nextPath = getAdjacentRoutePath(currentPath, 'next', routes)

  return (
    <Wrapper>
      <Button disabled={previousPath === currentPath} onClick={() => props.history.push(previousPath)}>
        Prev
      </Button>

      <Button disabled={nextPath === currentPath} onClick={() => props.history.push(nextPath)}>
        Next
      </Button>

      <Button hoverable>
        ...
        <RoutesList>
          {routes.map(route => (
            <div key={route} onClick={() => props.history.push(route)}>
              {route}
            </div>
          ))}
        </RoutesList>
      </Button>

      <Button onClick={props.handlePrefill}>Prefill</Button>
    </Wrapper>
  )
}

/* prettier-ignore */
const RoutesList = styled.div`
  padding: 2px 4px;

  position: absolute;
  left: -1px;
  bottom: 100%;

  background: rgba(128, 128, 128, 0.7);
  border: 1px solid rgba(128, 128, 128, 0.7);
  border-radius: 4px 4px 4px 0;
  text-align: left;

  color: white;

  transition: 0.2s;

  opacity: 0;
  pointer-events: none;

  &:hover {
    opacity: 1;
    pointer-events: auto;
  }

  div {
    white-space: nowrap;
    padding: 2px 0;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;

  position: fixed;
  bottom: 5px;
  left: 5px;

  border-radius: 4px;
  background: rgba(128, 128, 128, 0.2);

  z-index: 10000;
  user-select: none;
`

const Button = styled.button`
  margin: 5px;
  padding: 2px 4px;

  position: relative;

  background: rgba(128, 128, 128, 0.7);
  border: 1px solid rgba(128, 128, 128, 0.7);
  outline: none;
  border-radius: 4px;

  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  &:hover > {
    ${props => props.hoverable && 'border-radius: 0 0 4px 4px'};

    ${RoutesList} {
      opacity: 1;
      pointer-events: auto;
    }
  }
`
