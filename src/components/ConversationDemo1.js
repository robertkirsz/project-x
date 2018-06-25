import React, { Component } from 'react'
import styled from 'styled-components'

import person1 from 'assets/person.jpg'
import person2 from 'assets/person2.jpg'
import front from 'assets/photo-front-2.png'
import back from 'assets/photo-back-2.png'
import logo from 'assets/id-now-logo.svg'

export default class ConversationDemo1 extends Component {
  state = {
    screenIndex: 0
  }

  goNext = () => {
    const nextScreen = this.state.screenIndex + 1

    if (nextScreen >= 4) return this.props.onFinish()

    this.setState({ screenIndex: nextScreen })
  }

  render() {
    const { texts } = this.props
    const { screenIndex } = this.state

    const screens = [
      {
        title: texts[0],
        subtitle: texts[1],
        primary: person1,
        size: 'cover',
        position: 'center top',
        secondary: true
      },
      {
        title: texts[2],
        subtitle: texts[3],
        primary: front,
        size: 'contain',
        position: 'center bottom',
        secondary: false
      },
      {
        title: texts[4],
        subtitle: texts[5],
        primary: back,
        size: 'contain',
        position: 'center bottom',
        secondary: false
      },
      {
        title: texts[6],
        subtitle: texts[7],
        primary: person1,
        size: 'cover',
        position: 'center top',
        secondary: true
      }
    ]

    return (
      <Wrapper onClick={this.goNext}>
        <Images>
          <Primary
            style={{
              backgroundImage: `url(${screens[screenIndex].primary})`,
              backgroundSize: screens[screenIndex].size,
              backgroundPosition: screens[screenIndex].position
            }}
          />
          {screens[screenIndex].secondary && <Secondary />}
          <Logo />
        </Images>

        <Content>
          <Title>{screens[screenIndex].title}</Title>
          <Subtitle>{screens[screenIndex].subtitle}</Subtitle>
        </Content>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Images = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`

const Primary = styled.div`
  flex: 1;
  background-color: black;
  background-repeat: no-repeat;
`

const Secondary = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 96px;
  height: 128px;
  background: #d8d8d8 url(${person2}) no-repeat center top;
  background-size: 140px;
  border: 2px solid #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const Logo = styled.img.attrs({ src: logo, alt: '' })`
  position: absolute;
  left: 16px;
  bottom: 8px;
  z-index: 1;
`

const Content = styled.div`
  flex: none;
  background: #e8e8e8;
  padding: 18px 16px 27px;
  font-family: Roboto;
`

const Title = styled.div`
  font-size: 16px;
  color: #f39100;
  letter-spacing: -0.29px;
  line-height: 19px;
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #1f1a15;
  letter-spacing: -0.25px;
  line-height: 19px;
  margin-top: 16px;
`
