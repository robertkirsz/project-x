import React from 'react'
import styled from 'styled-components'

import move from 'utils/move'

import Pagination from 'components/Pagination'
import Swiper from 'components/Swiper'

import card1 from 'assets/card-1.png'
import card2 from 'assets/card-2.png'
import card3 from 'assets/card-3.png'

export default ({ value, onChange }) => {
  const handleChange = cardIndex => event => onChange(cardIndex)

  return (
    <Wrapper>
      <Swiper onSwipeLeft={handleChange(move(value, 1, 2))} onSwipeRight={handleChange(move(value, -1, 2))}>
        <Track offset={value}>
          <Card src={card1} isActive={value === 0} onClick={handleChange(0)} />
          <Card src={card2} isActive={value === 1} onClick={handleChange(1)} />
          <Card src={card3} isActive={value === 2} onClick={handleChange(2)} />
        </Track>
      </Swiper>

      <Pagination size={3} value={value} onChange={handleChange} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  margin-top: 24px;
  overflow: hidden;
`

const Track = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-self: stretch;
  position: relative;
  left: calc((100vw - 296px) / 2 - ${props => props.offset * 296}px);
  transition: 0.3s;
`

// prettier-ignore
const Card = styled.img.attrs({ alt: '' })`
  flex: none;
  display: block;
  width: 296px;
  height: 187px;

  transition: 0.3s;

  ${props => !props.isActive && `
    opacity: 0.5;
    transform: scale(0.9);
  `}
`
