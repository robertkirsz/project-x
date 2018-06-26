import isPhoneNUmberValid from 'utils/isPhoneNUmberValid'

it('isPhoneNUmberValid() properly validates strings', () => {
  expect(isPhoneNUmberValid('1234567890')).toBeTruthy()
  expect(isPhoneNUmberValid('123_______')).toBeFalsy()
  expect(isPhoneNUmberValid(null)).toBeFalsy()
})
