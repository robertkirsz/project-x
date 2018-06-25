import img01 from 'assets/arrow-left.svg'
import img02 from 'assets/card-1.png'
import img03 from 'assets/card-2.png'
import img04 from 'assets/card-3.png'
import img05 from 'assets/check.svg'
import img06 from 'assets/logo.svg'
import img07 from 'assets/map-marker.svg'
import img09 from 'assets/motife-expanded.png'
import img10 from 'assets/pdf-icon.svg'
import img11 from 'assets/usp-1.png'
import img12 from 'assets/usp-2.png'
import img13 from 'assets/usp-3.png'
import img14 from 'assets/usp-4.png'
import img15 from 'assets/video-identification-1.svg'
import img16 from 'assets/video-identification-2.svg'
import img17 from 'assets/video-identification-3.svg'
import img18 from 'assets/video-identification-4.svg'
import img19 from 'assets/pin-logo.svg'
import img20 from 'assets/mail.svg'
import img21 from 'assets/camera.svg'
import img22 from 'assets/account-creating.svg'
import img23 from 'assets/account-ready.svg'
import img24 from 'assets/native-map-marker.svg'
import img25 from 'assets/2/usp-1.gif'
import img26 from 'assets/2/usp-2.gif'
import img27 from 'assets/2/usp-3.gif'
import img28 from 'assets/2/usp-4.gif'
import img29 from 'assets/2/step-info-back.svg'
import img30 from 'assets/2/step-info-check.svg'
import img31 from 'assets/2/edit-phone-number.svg'
import img32 from 'assets/2/consent-logo.svg'
import img33 from 'assets/2/consent-logo-2.svg'
import img34 from 'assets/2/background-pattern.svg'
import img35 from 'assets/2/camera-button.svg'
import img36 from 'assets/2/card-sample.svg'
import img37 from 'assets/2/photo-mask.svg'

const images = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
  img36,
  img37
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
