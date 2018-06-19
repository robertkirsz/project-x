import arrowLeft from 'assets/arrow-left.svg'
import card1 from 'assets/card-1.png'
import card2 from 'assets/card-2.png'
import card3 from 'assets/card-3.png'
import check from 'assets/check.svg'
import logo from 'assets/logo.svg'
import mapMarker from 'assets/map-marker.svg'
import motife1 from 'assets/motife-collapsed.png'
import motife2 from 'assets/motife-expanded.png'
import pdfIcon from 'assets/pdf-icon.svg'
import usp1 from 'assets/usp-1.png'
import usp2 from 'assets/usp-2.png'
import usp3 from 'assets/usp-3.png'
import usp4 from 'assets/usp-4.png'
import video1 from 'assets/video-identification-1.svg'
import video2 from 'assets/video-identification-2.svg'
import video3 from 'assets/video-identification-3.svg'
import video4 from 'assets/video-identification-4.svg'
import pinLogo from 'assets/pin-logo.svg'
import mail from 'assets/mail.svg'
import camera from 'assets/camera.svg'

const images = [
  arrowLeft,
  card1,
  card2,
  card3,
  check,
  logo,
  mapMarker,
  motife1,
  motife2,
  pdfIcon,
  usp1,
  usp2,
  usp3,
  usp4,
  video1,
  video2,
  video3,
  video4,
  pinLogo,
  mail,
  camera
]

export default () =>
  Promise.all(
    images.map(
      src =>
        new Promise(resolve => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
        })
    )
  )
