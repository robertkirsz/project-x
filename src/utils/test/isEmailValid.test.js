import isEmailValid from 'utils/isEmailValid'

it('isEmailValid() properly validates emails', () => {
  expect(isEmailValid('foo@bar.com')).toBeTruthy()
  expect(isEmailValid('foo.bar.com')).toBeFalsy()
})
