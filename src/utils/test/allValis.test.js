import allValid from 'utils/allValid'

it('allValid() properly validates all keys', () => {
  expect(allValid(['name'], { name: 'John'})).toBeTruthy()
  expect(allValid(['name'], { name: ''})).toBeFalsy()
  expect(allValid(['name', 'age'], { name: 'John', age: 30 })).toBeTruthy()
  expect(allValid(['name', 'age'], { name: 'John', age: 0 })).toBeTruthy()
  expect(allValid(['name', 'age'], { name: 'John', age: 18 }, { age: value => value > 18 })).toBeFalsy()
  expect(allValid(['name', 'age'], { name: 'John', age: 30 }, { age: value => value > 18 })).toBeTruthy()
  expect(allValid(['name', 'age'], { name: 'John', age: null })).toBeFalsy()
})
