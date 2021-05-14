# url-y

A URL shortener with a REST api and front-end. Built with Node.js, Express, and MongoDB.

## API

### Get all shortened URLs

```HTTP
  GET /api/
```

#### Response

```ts
  // An array of the currently held URLs
  [
    {
      "shortUrl": String
      "fullUrl": String
      "clicks": Number
    },
    ...
  ]
```

### Add new URL

```HTTP
  POST /api/create
```

#### Query parameters

| Parameter           | Type     | Description                                |
| ------------------- | -------- | ------------------------------------------ |
| shortUrl (required) | `string` | The shortened URL, must not already exist. |
| fullUrl (required)  | `string` | The full URL.                              |

#### Response

```ts
  // The new item
  {
    "shortUrl": String
    "fullUrl": String
    "clicks": 0
  }
```

### Update existing URL

```HTTP
  PATCH /api/update
```

#### Query parameters

| Parameter           | Type     | Description                    |
| ------------------- | -------- | ------------------------------ |
| shortUrl (required) | `string` | The shortened URL, must exist. |
| \*newShortUrl       | `string` | The new short URL.             |
| \*newfullUrl        | `string` | The new full URL.              |

\*At least one tagged parameters must be provided.

#### Response

```ts
  // The updated item
  {
    "shortUrl": String
    "fullUrl": String
    "clicks": Number
  }
```

### Delete existing URL

```HTTP
  DELETE /api/delete
```

#### Query parameters

| Parameter           | Type     | Description                    |
| ------------------- | -------- | ------------------------------ |
| shortUrl (required) | `string` | The shortened URL, must exist. |

#### Response

```ts
  // The deleted item
  {
    "shortUrl": String
    "fullUrl": String
    "clicks": Number
  }
```
