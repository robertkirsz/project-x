import React from 'react'
import styled from 'styled-components'
import { Div } from 'styled-kit'

import { withTexts } from 'providers/TextProvider'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'

import camera from 'assets/camera.svg'

const iconsMap = {
  camera: camera,
  location: camera
}

const textsMap = {
  camera: 'allowCamera',
  location: 'allowCamera'
}

const NativeModal = props => (
  <Dialog open={props.open} onClose={props.onClose} style={{ fontFamily: 'Roboto' }}>
    <Div listLeft={35} itemsStart padding="36px 24px 0">
      <img src={iconsMap[props.type]} alt="" />
      <DialogText>{props.texts.misc[textsMap[props.type]]}</DialogText>
    </Div>

    <DialogActions>
      <Button onClick={props.onClose}>{props.texts.misc.deny}</Button>
      <Button onClick={props.onConfirm} style={{ color: '#4DB6AC' }}>
        {props.texts.misc.allow}
      </Button>
    </DialogActions>
  </Dialog>
)

export default withTexts(NativeModal)

const DialogText = styled.div`
  font-size: 16px;
  color: #666;
  letter-spacing: 0;
  line-height: 20px;
`
