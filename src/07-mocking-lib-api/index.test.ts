// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = 'relative/path';
  const expectedData = [{ name: 'Bob' }];
  const expectedResponse = { data: expectedData };
  const baseURL = 'https://jsonplaceholder.typicode.com';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
      expectedResponse,
    );
    (axios.create as jest.MockedFunction<typeof axios.create>) = jest.fn(
      () => axios,
    );
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    return expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    return expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('');
    jest.runAllTimers();
    expect(data).toBe(expectedResponse.data);
  });
});
