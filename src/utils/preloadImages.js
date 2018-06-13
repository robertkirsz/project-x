import logo from 'assets/logo.svg'
import motife1 from 'assets/motife-collapsed.png'
import motife2 from 'assets/motife-expanded.png'
import usp1 from 'assets/usp-1.png'
import usp2 from 'assets/usp-2.png'
import usp3 from 'assets/usp-3.png'
import usp4 from 'assets/usp-4.png'

export default () => {
  const promises = [logo, motife1, motife2, usp1, usp2, usp3, usp4].map(
    url =>
      new Promise(resolve => {
        const img = new Image()
        img.src = url
        img.onload = () => resolve()
      })
  )

  return Promise.all(promises)
}
