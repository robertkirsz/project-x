import isPasswordValid from 'utils/isPasswordValid'

it('isPasswordValid() properly validates strings', () => {
  expect(isPasswordValid('As^58&6hdhs7^$h')).toBeTruthy()
  expect(isPasswordValid('avf')).toBeFalsy()
  expect(isPasswordValid('sdfh6asdasdasdsdaseed')).toBeFalsy()
  expect(isPasswordValid(null)).toBeFalsy()
})
