import React from 'react'
import styled from 'styled-components'

import motife from 'assets/motife-collapsed.png'

const Background = props => (
  <Wrapper>
    {props.children}
    <Stripes />
  </Wrapper>
)

export default Background

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  ${props =>
    props.show &&
    `
    background: url(${motife}) center bottom no-repeat;
    background-size: contain;
  `};
`

const Stripes = styled.div`
  display: flex;
  width: 100%;
`

const Red = styled.div`
  width: 101px;
  background: #e41509;
`

const Black = styled.div`
  width: 14px;
  background: #1f1a15;
`

const Orange = styled.div`
  width: 81px;
  background: #f39100;
`

const DarkRed = styled.div`
  width: 58px;
  background: #cc0915;
`

const Blue = styled.div`
  width: 14px;
  background: #0976bd;
`

const Green = styled.div`
  width: 92px;
  background: #20a134;
`
