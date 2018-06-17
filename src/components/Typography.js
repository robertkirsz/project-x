import styled, { css } from 'styled-components'

const withUnit = value => (typeof value === 'number' ? `${value}px` : value)

/* prettier-ignore */
const baseStyles = css`
  display: flex;
  align-items: center;
  margin: 0;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0;
  color: #1F1A15;
  ${({ center }) => center && 'text-align: center;'}
  ${({ mTop }) => mTop && typeof mTop !== 'boolean' && css`margin-top: ${withUnit(mTop)};`}
  ${({ mRight }) => mRight && typeof mRight !== 'boolean' && css`margin-right: ${withUnit(mRight)};`}
  ${({ mBottom }) => mBottom && typeof mBottom !== 'boolean' && css`margin-bottom: ${withUnit(mBottom)};`}
  ${({ mLeft }) => mLeft && typeof mLeft !== 'boolean' && css`margin-left: ${withUnit(mLeft)};`}
`

export const H1 = styled.h1`
  ${baseStyles};
  font-size: 24px;
  line-height: 1.5;
  letter-spacing: -0.57px;
`

export const H2 = styled.h2`
  ${baseStyles};
  font-size: 18px;
  line-height: 1.5;
`

export const Paragraph = styled.p`
  ${baseStyles};
  font-size: 16px;
  color: #3B3B3B;
  line-height: 1.5;
`

export const Small = styled.p`
  ${baseStyles};
  font-size: 12px;
  color: #0976bd;
`

export const Link = styled.span`
  ${baseStyles};
  display: inline-flex;
  font-size: 14px;
  color: #f39100;
  cursor: pointer;
  text-decoration: underline;
`
