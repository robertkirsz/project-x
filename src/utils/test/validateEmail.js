import validateEmail from 'utils/validateEmail'

it('validateEmail() properly validates emails', () => {
  expect(validateEmail('foo@bar.com')).toBeTruthy()
  expect(validateEmail('foo.bar.com')).toBeFalsy()
})
