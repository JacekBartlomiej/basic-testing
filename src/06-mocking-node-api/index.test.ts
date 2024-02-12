// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import promises from 'fs/promises';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeout = 1000;
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn(() => console.log('something'));
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const timeout = 1000;
    const callback = jest.fn();
    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const timeout = 1000;
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn(() => console.log('something'));
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timeout = 1000;
    const callback = jest.fn();
    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('path');
jest.mock('fs/promises');
jest.mock('fs');

describe('readFileAsynchronously', () => {
  const pathToFile = 'example.txt'
  const expectedFullPath = `${__dirname}/${pathToFile}`;
  const expectedFileContent = 'Expected file content';

  test('should call join with pathToFile', async () => {
    (path.join as jest.MockedFunction<typeof path.join>).mockReturnValue(expectedFullPath);
    await readFileAsynchronously(pathToFile);
    expect(path.join).toHaveReturnedWith(expectedFullPath);
  });

  test('should return null if file does not exist', async () => {
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(false);
    const fileContent = await readFileAsynchronously(pathToFile);
    expect(fileContent).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    (path.join as jest.MockedFunction<typeof path.join>).mockReturnValue(expectedFullPath);
    (fs.existsSync as jest.MockedFunction<typeof fs.existsSync>).mockReturnValue(true);
    (promises.readFile as jest.MockedFunction<typeof promises.readFile>).mockResolvedValue(expectedFileContent);
    const fileContent = await readFileAsynchronously(pathToFile);
    expect(fileContent).toEqual(expectedFileContent);
  });
});
