// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  const val = 'Resolved value';
  test('should resolve provided value', async () => {
    await expect(resolveValue(val)).resolves.toEqual(val);
  });
});

describe('throwError', () => {
  const errorMessage = 'Custom error message';
  test('should throw error with provided message', () => {
    expect(() => throwError(errorMessage)).toThrow(new Error(errorMessage));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
