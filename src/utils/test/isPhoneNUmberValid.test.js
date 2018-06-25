import isPhoneNUmberValid from 'utils/isPhoneNUmberValid'

it('isPhoneNUmberValid() properly validates strings', () => {
  expect(isPhoneNUmberValid('123 456 789')).toBeTruthy()
  expect(isPhoneNUmberValid('123 ___ ___')).toBeFalsy()
  expect(isPhoneNUmberValid(null)).toBeFalsy()
})
