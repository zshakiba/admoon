
const fetchPage = require('../app/utils/api')
global.fetch = jest.fn();

describe('fetchPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches successfully data from an API', async () => {
    // Arrange
    const mockData = {
      "data": [
        {
          "id": 63,
          "name": "پژوهشگر",
          "side": "شهروند",
          "side_type": "1",
          "number": "هر شب",
          "status": "اجرای قابلیت در شب",
          "gallery": {
            "image": "10782838411381906653809.png",
            "path": "/upload/image/role",
            "type": "role"
          },
          "category": [
            {
              "id": 8,
              "name": "سناریو پژوهشگر",
              "created_at": "2023-05-22T08:36:41.000000Z",
              "updated_at": "2023-05-22T08:36:41.000000Z",
              "pivot": {
                "role_id": 63,
                "category_id": 8
              }
            }
          ]
        },
      ],
      "links": {
        "first": "https://api.shabe.ir/role?page=1",
        "last": "https://api.shabe.ir/role?page=5",
        "prev": null,
        "next": "https://api.shabe.ir/role?page=2"
      },
      "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 5,
        "links": [
          {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
          }
        ],
        "path": "https://api.shabe.ir/role",
        "per_page": 15,
        "to": 15,
        "total": 63
      }
    };
    const mockResponse = { json: jest.fn().mockResolvedValue(mockData) };
    global.fetch.mockResolvedValue(mockResponse);

    // Act
    const result = await fetchPage(1);

    // Assert
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('https://api.shabe.ir/role?page=1', {
      signal: expect.any(AbortSignal),
    });
  });

  it('handles errors during fetching', async () => {
    // Arrange
    const mockError = new Error('Mocked error');
    global.fetch.mockRejectedValue(mockError);

    // Act
    const result = await fetchPage(1);

    // Assert
    expect(result).toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith('https://api.shabe.ir/role?page=1', {
      signal: expect.any(AbortSignal),
    });
    // You can add more specific error handling assertions based on your actual error handling logic
  });
});

