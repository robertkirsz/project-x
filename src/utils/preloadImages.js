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
  usp4
]

export default () => {
  const promises = images.map(
    url =>
      new Promise(resolve => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve()
      })
  )

  return Promise.all(promises)
}
