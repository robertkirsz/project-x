import parseValues from 'utils/parseValues'

it('parseValues() properly parses interpolated values', () => {
  const string = 'Hey {userName}! You found {amount} gold!'
  const values = { userName: 'John', amount: 12 }
  const output = 'Hey John! You found 12 gold!'

  expect(parseValues(string, values)).toEqual(output)
})
