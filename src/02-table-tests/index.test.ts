import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 1, action: Action.Subtract, expected: 1  },
  { a: 3, b: 1, action: Action.Multiply, expected: 3 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 2, action: 'INVALID', expected: null },
  { a: 'a', b: 2, action: Action.Exponentiate, expected: null }
];

describe('simpleCalculator tests (Table-driven tests table format)', () => {
  test.each(testCases)(
    'should return calculation results as expected',
    ({a, b, action, expected}) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
