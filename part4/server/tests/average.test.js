var average = require('../utils/for_testing').average;

describe.skip('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(1)
	})

	test('of many is calculated right', () => {
		expect(average([3, 4, 6, 6, 9, 2])).toBe(5)
	})

	test('of empty array is zero', () => {
		expect(average([])).toBe(0)
	})
})