// Import the fetchPage function
import { fetchPage } from './yourFileName'; // Replace 'yourFileName' with the actual file name

// Mock the global fetch function
global.fetch = jest.fn();

// Your test suite
describe('fetchPage', () => {
  // Test case for successful data fetching
  it('fetches data successfully', async () => {
    // Arrange
    const pageNumber = 1;
    const responseData = { /* Mocked response data */ };
    const mockJsonPromise = Promise.resolve(responseData);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });

    global.fetch.mockImplementation(() => mockFetchPromise);

    // Act
    const result = await fetchPage(pageNumber);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(`https://api.shabe.ir/role?page=${pageNumber}`, {
      signal: expect.any(AbortSignal),
    });
    expect(result).toEqual(responseData);
  });

  // Test case for aborted request
  it('aborts request and returns undefined', async () => {
    // Arrange
    const pageNumber = 1;
    const mockAbortController = new AbortController();
    const mockFetchPromise = Promise.resolve({
      json: jest.fn(),
    });

    global.fetch.mockImplementation(() => mockFetchPromise);

    // Act
    mockAbortController.abort();
    const result = await fetchPage(pageNumber);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(`https://api.shabe.ir/role?page=${pageNumber}`, {
      signal: mockAbortController.signal,
    });
    expect(result).toBeUndefined();
  });

  // Test case for error handling
  it('handles errors and returns undefined', async () => {
    // Arrange
    const pageNumber = 1;
    const mockFetchPromise = Promise.reject(new Error('Network error'));

    global.fetch.mockImplementation(() => mockFetchPromise);

    // Act
    const result = await fetchPage(pageNumber);

    // Assert
    expect(global.fetch).toHaveBeenCalledWith(`https://api.shabe.ir/role?page=${pageNumber}`, {
      signal: expect.any(AbortSignal),
    });
    expect(result).toBeUndefined();
    // You may add more assertions based on your error handling logic
  });
});
