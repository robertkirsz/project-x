import React, { Component } from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'
import { colors } from 'styles'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { H1, H2, Link } from 'components/Typography'
import Button from 'components/Button'

import downloadFile from 'assets/2/download-file.svg'
import contractPdf from 'assets/Contract.pdf'

class Step1Page extends Component {
  state = { confirmed: false }

  handleCheckboxChange = name => event => this.setState({ [name]: event.target.checked })

  render() {
    const { texts } = this.props

    const t = texts.onboarding1.step1

    return (
      <Div flex={1} column itemsCenter padding="30px 16px">
        <H1 center>{t.finish[0]}</H1>

        <H2 center mTop={24}>
          {t.finish[1]}
        </H2>

        <H2 center>{t.finish[2]}</H2>

        <StyledLink mTop={36} href={contractPdf} download="Contract.pdf">
          <img src={downloadFile} alt="" style={{ marginRight: 18 }} />
          {t.finish[3]}
        </StyledLink>

        <FormControlLabel
          label={<WithEm dangerouslySetInnerHTML={{ __html: t.finish[4] }} />}
          style={{ marginTop: 'auto' }}
          control={
            <Checkbox
              checked={this.state.confirmed}
              onChange={this.handleCheckboxChange('confirmed')}
              value="confirmed"
              color="primary"
            />
          }
        />

        <Button
          onClick={() => this.props.history.push('/onboarding-2/step-4')}
          disabled={!this.state.confirmed}
          style={{ marginTop: 24 }}
        >
          {texts.misc.nextStep}
        </Button>
      </Div>
    )
  }
}

export default withTexts(Step1Page)

const WithEm = styled.div`
  em {
    font-style: normal;
    color: ${colors.orange};
  }
`

const StyledLink = Link.extend`
  font-size: 18px;
  color: ${colors.orange};
  letter-spacing: 0;
  line-height: 20px;
  text-decoration: none;
`
