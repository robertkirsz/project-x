import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Div } from 'styled-kit';

import { Heading, Paragraph } from 'components/Typography';
import Button from 'components/Button';

import logo from 'assets/logo.svg';
import image1 from 'assets/usp-1.png';
import image2 from 'assets/usp-2.png';
import image3 from 'assets/usp-3.png';
import image4 from 'assets/usp-4.png';

export default class UspPage extends Component {
  state = {
    currentSlide: 0,
  };

  goToSlide = index => event => this.setState({ currentSlide: index });

  render() {
    const { currentSlide } = this.state;

    return (
      <Div flex={1} column itemsCenter padding="0 16px 30px">
        <Header>
          <SkipButton to="/">SKIP</SkipButton>
        </Header>

        <Div flex={1}>
          {currentSlide === 0 && (
            <Div flex={1} column itemsCenter padding={30}>
              <img src={image1} width="217" alt="" />
              <Heading center mTop={24}>
                Transfer money for free worldwide
              </Heading>
              <Paragraph center mTop={16}>
                Send money abroad for free in realtime with mBank Europe. Transfer money to any bank, business or friend
                immediately.
              </Paragraph>
            </Div>
          )}

          {currentSlide === 1 && (
            <Div flex={1} column itemsCenter padding={30}>
              <img src={image2} width="217" alt="" />
              <Heading center mTop={24}>
                ATM for free worldwide
              </Heading>
              <Paragraph center mTop={16}>
                Up to 500 Euro you can take cash from ATM for free in any country.
              </Paragraph>
            </Div>
          )}

          {currentSlide === 2 && (
            <Div flex={1} column itemsCenter padding={30}>
              <img src={image3} width="217" alt="" />
              <Heading center mTop={24}>
                Multicurrency contactless
              </Heading>
              <Paragraph center mTop={16}>
                Pay in any country with your credit card with exchange rate 0,1%, the lowest on the market.
              </Paragraph>
            </Div>
          )}

          {currentSlide === 3 && (
            <Div flex={1} column itemsCenter padding={30}>
              <img src={image4} width="217" alt="" />
              <Heading center mTop={24}>
                …and many more!
              </Heading>
              <Paragraph center mTop={16}>
                Credit, insurance, investments and more: insure your trips, use simply investment tools. Get your loan
                on one click process.
              </Paragraph>
            </Div>
          )}
        </Div>

        {currentSlide < 3 && (
          <Div flex="none" itemsCenter listLeft={12}>
            {[...Array(4)].map((value, index) => (
              <Pagination key={index} isActive={currentSlide === index} onClick={this.goToSlide(index)} />
            ))}
          </Div>
        )}

        {currentSlide === 3 && <Button>Start now!</Button>}
      </Div>
    );
  }
}

const Header = styled.header`
  flex: none;
  display: flex;
  align-items: center;
  align-self: stretch;
  height: 46px;
  background: url(${logo}) center center no-repeat;
  background-size: 78px;
`;

const SkipButton = styled(Link)`
  font-size: 16px;
  color: #959595;
  margin-left: auto;
  text-decoration: none;
  cursor: pointer;
`;

const Pagination = styled.span`
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => (props.isActive ? 'black' : 'rgba(0, 0, 0, 0.2)')};

  transition: 0.3s;
  cursor: pointer;
`;
