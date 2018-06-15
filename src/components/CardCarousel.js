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
      <Swiper onSwipeLeft={() => onChange(move(value, 1, 3))} onSwipeRight={() => onChange(move(value, -1, 3))}>
        <Track offset={value}>
          <Card src={card1} isActive={value === 0} onClick={handleChange(0)} alt="Card 1" />
          <Card src={card2} isActive={value === 1} onClick={handleChange(1)} alt="Card 2" />
          <Card src={card3} isActive={value === 2} onClick={handleChange(2)} alt="Card 3" />
          <Card src={card1} isActive={value === 3} onClick={handleChange(3)} alt="Card 4" />
        </Track>
      </Swiper>

      <Pagination size={4} value={value} onChange={this.handleChange} />
    </Wrapper>
  )
}

/* prettier-ignore */
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

const Card = styled.img`
  flex: none;
  display: block;
  width: 296px;
  height: 187px;

  transition: 0.3s;

  ${props =>
    !props.isActive &&
    `
    opacity: 0.5;
    transform: scale(0.9);
  `};
`
