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
import img08 from 'assets/usp-5.png'
import img15 from 'assets/video-identification-1.svg'
import img16 from 'assets/video-identification-2.svg'
import img17 from 'assets/video-identification-3.svg'
import img18 from 'assets/video-identification-4.svg'
import img50 from 'assets/video-identification-3.svg'
import img19 from 'assets/pin-logo.svg'
import img20 from 'assets/mail.svg'
import img21 from 'assets/camera.svg'
import img23 from 'assets/account-ready.svg'
import img24 from 'assets/native-map-marker.svg'
import img25 from 'assets/2/usp-1.gif'
import img26 from 'assets/2/usp-2.gif'
import img27 from 'assets/2/usp-3.gif'
import img28 from 'assets/2/usp-4.gif'
import img38 from 'assets/2/usp-5.gif'
import img29 from 'assets/2/step-info-back.svg'
import img30 from 'assets/2/step-info-check.svg'
import img31 from 'assets/2/edit-phone-number.svg'
import img32 from 'assets/2/consent-logo.svg'
import img33 from 'assets/2/consent-logo-2.svg'
import img34 from 'assets/2/background-pattern.svg'
import img35 from 'assets/2/camera-button.svg'
import img36 from 'assets/2/card-sample.svg'
import img37 from 'assets/2/photo-mask.svg'
import img39 from 'assets/person.jpg'
import img40 from 'assets/2/photo-preview.png'
import img41 from 'assets/2/dashboard1.png'
import img42 from 'assets/2/dashboard2.png'
import img43 from 'assets/person2.jpg'
import img44 from 'assets/photo-front.png'
import img45 from 'assets/photo-front-2.png'
import img46 from 'assets/photo-back.png'
import img47 from 'assets/photo-back-2.png'
import img48 from 'assets/id-now-logo.svg'
import img49 from 'assets/loader.gif'
import img51 from 'assets/germany.svg'

const images = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
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
  img37,
  img38,
  img39,
  img40,
  img41,
  img42,
  img43,
  img44,
  img45,
  img46,
  img47,
  img48,
  img49,
  img50,
  img51
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
