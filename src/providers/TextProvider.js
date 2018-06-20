import React, { createContext } from 'react'

import english from 'text/english'
import german from 'text/german'

const languages = { english, german }
const { Provider, Consumer } = createContext()

export default ({ language, ...props }) => <Provider value={languages[language]} {...props} />

export const withTexts = Component => props => <Consumer>{texts => <Component {...props} texts={texts} />}</Consumer>
