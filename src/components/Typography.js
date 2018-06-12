import styled, { css } from 'styled-components'

const withUnit = value => (typeof value === 'number' ? `${value}px` : value);

const baseStyles = css`
  margin: 0;
  color: #1F1A15;
  ${({ center }) => center && 'text-align: center;'}
  ${({ mTop }) => mTop && typeof mTop !== 'boolean' && css`margin-top: ${withUnit(mTop)};`}
  ${({ mRight }) => mRight && typeof mRight !== 'boolean' && css`margin-right: ${withUnit(mRight)};`}
  ${({ mBottom }) => mBottom && typeof mBottom !== 'boolean' && css`margin-bottom: ${withUnit(mBottom)};`}
  ${({ mLeft }) => mLeft && typeof mLeft !== 'boolean' && css`margin-left: ${withUnit(mLeft)};`}
`

export const Heading = styled.h1`
  font: 300 24px/36px Roboto, sans-serif;
  letter-spacing: -0.57px;
  ${baseStyles};
`

export const Paragraph = styled.p`
  font: 300 18px/26px Roboto, sans-serif;
  letter-spacing: 0;
  ${baseStyles};
`
