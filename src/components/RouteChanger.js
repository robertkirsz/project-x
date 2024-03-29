import React from 'react'
import styled from 'styled-components'

import getAdjacentRoutePath from 'utils/getAdjacentRoutePath'

import routes from 'routes'

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
    </Wrapper>
  )
}

const RoutesList = styled.div`
  padding: 2px 4px;

  max-height: calc(100vh - 60px);

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

  overflow: auto;

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
`

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
