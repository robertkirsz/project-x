import logo from 'assets/logo.svg'
import motife1 from 'assets/motife-collapsed.png'
import motife2 from 'assets/motife-expanded.png'
import usp1 from 'assets/usp-1.png'
import usp2 from 'assets/usp-2.png'
import usp3 from 'assets/usp-3.png'
import usp4 from 'assets/usp-4.png'
import card1 from 'assets/card-1.png'
import card2 from 'assets/card-2.png'
import card3 from 'assets/card-3.png'

const images = [logo, motife1, motife2, usp1, usp2, usp3, usp4, card1, card2, card3]

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
