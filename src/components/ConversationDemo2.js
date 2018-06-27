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

    if (nextScreen >= 3) return this.props.onFinish()

    this.setState({ screenIndex: nextScreen })
  }

  render() {
    const { texts } = this.props
    const { screenIndex } = this.state

    const screens = [
      {
        subtitle: texts[1],
        primary: person2,
        size: 'cover',
        position: 'center top',
        secondary: true
      },
      {
        subtitle: texts[3],
        primary: front,
        size: 'contain',
        position: 'center bottom',
        secondary: false
      },
      {
        subtitle: texts[5],
        primary: back,
        size: 'contain',
        position: 'center bottom',
        secondary: false
      }
    ]

    return (
      <Wrapper onClick={this.goNext}>
        {screens.map((screen, index) => (
          <Layer key={index} isVisible={index <= screenIndex} style={{ zIndex: index }}>
            <Images>
              <Primary
                style={{
                  backgroundImage: `url(${screens[index].primary})`,
                  backgroundSize: screens[index].size,
                  backgroundPosition: screens[index].position
                }}
              />
              {screens[index].secondary && <Secondary />}
              <Logo />
            </Images>

            <Content>
              <Bubble>
                <Subtitle>{screens[index].subtitle}</Subtitle>
              </Bubble>
            </Content>
          </Layer>
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
  margin-top: 90px;
  position: relative;
`

const Layer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  background: black;
`

const Images = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`

const Primary = styled.div`
  flex: 1;
  background-repeat: no-repeat;
`

const Secondary = styled.div`
  position: absolute;
  top: 26px;
  right: 16px;
  width: 96px;
  height: 128px;
  background: #d8d8d8 url(${person1}) no-repeat center -20px;
  background-size: 140px;
  border: 2px solid white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const Logo = styled.img.attrs({ src: logo, alt: '' })`
  position: absolute;
  left: 16px;
  bottom: 16px;
  z-index: 1;
`

const Content = styled.div`
  flex: none;
  background: white;
  padding: 16px 16px;
  height: 90px;
`

const Bubble = styled.div`
  position: relative;
  font-family: Roboto;
  background: #e8e8e8;
  border-radius: 8px 8px 8px 0;
  padding: 8px 10px;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: -4px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: #e8e8e8;
    transform: skewX(-31deg) rotate(-121deg);
    z-index: -1;
  }
`

const Subtitle = styled.div`
  font-size: 14px;
  color: #1f1a15;
  letter-spacing: -0.25px;
  line-height: 19px;
`
