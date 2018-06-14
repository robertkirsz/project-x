import React, { Component } from 'react'
import styled from 'styled-components'

import Pagination from 'components/Pagination'

import card1 from 'assets/card-1.png'
import card2 from 'assets/card-2.png'
import card3 from 'assets/card-3.png'

export default class CardCarousel extends Component {
  handleChange = cardIndex => this.props.onChange(cardIndex)

  render() {
    return (
      <Wrapper>
        <Track offset={this.props.value}>
          <Card src={card1} isActive={this.props.value === 0} onClick={() => this.handleChange(0)} alt="Card 1" />
          <Card src={card2} isActive={this.props.value === 1} onClick={() => this.handleChange(1)} alt="Card 2" />
          <Card src={card3} isActive={this.props.value === 2} onClick={() => this.handleChange(2)} alt="Card 3" />
          <Card src={card1} isActive={this.props.value === 3} onClick={() => this.handleChange(3)} alt="Card 4" />
        </Track>

        <Pagination size={4} value={this.props.value} onChange={this.handleChange} />
      </Wrapper>
    )
  }
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

  ${props => !props.isActive && `
    opacity: 0.5;
    transform: scale(0.9);
  `};
`
