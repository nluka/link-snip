# url-y

A URL shortener with a REST api and front-end (coming soon). Built with Node.js, Express, and MongoDB.

- [Servers](#servers)
- [API Reference](#api-reference)
  - [Get all shortened URLs](#get-all-shortened-urls)
  - [Add new URL](#add-new-url)
  - [Update existing URL](#update-existing-url)
  - [Delete existing URL](#delete-existing-url)

## Servers

| Name       | URL                                                          | Description                                                                                                                 |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Production | [https://url-y.herokuapp.com/](https://url-y.herokuapp.com/) | The primary server. Note that it may take some time to respond to the first call, as the free heroku server is starting up. |

## API Reference

### Get all shortened URLs

```HTTP
  GET /api/
```

#### Response

```ts
  // An array of the currently held URLs
  [
    {
      "name": String
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
    "name": String
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
    "name": String
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
    "name": String
    "shortUrl": String
    "fullUrl": String
    "clicks": Number
  }
```
