# Link Snip

A public URL shortener REST API with client. Built with Express, PostgreSQL, EJS and Bootstrap 5.

- [API Reference](#api-reference)
  - [Get All URLs](#get-all-urls)
  - [Create New URL](#create-new-url)
  - [Update Existing URL](#update-existing-url)
  - [Delete Existing URL](#delete-existing-url)
  - [Standard Error Response](#standard-error-response)

## API Reference

### Get All URLs

```HTTP
GET /api/
```

#### Response

```ts
// An array of the currently stored URLs
[
  {
    "name": String
    "actual": String
    "short": String
    "clicks": Number
  },
  ...
]
```

### Create New URL

```HTTP
POST /api/create
```

#### Query Parameters

| Parameter         | Type     | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| short (required)  | `string` | The short URL, must not already exist. |
| actual (required) | `string` | The full URL.                              |

#### Response

```ts
// The new URL
{
  "name": String,
  "actual": String,
  "short": String,
  "clicks": 0,
}
```

### Update Existing URL

```HTTP
PATCH /api/update
```

#### Query Parameters

| Parameter        | Type     | Description                    |
| ---------------- | -------- | ------------------------------ |
| short (required) | `string` | The short URL, must exist.     |
| \*name           | `string` | The new short name.            |
| \*actual         | `string` | The new full URL.              |

\*At least one tagged parameter must be provided.

#### Response

```ts
// The updated URL
{
  "name": String
  "actual": String
  "short": String
  "clicks": Number
}
```

### Delete Existing URL

```HTTP
DELETE /api/delete
```

#### Query Parameters

| Parameter        | Type     | Description                    |
| ---------------- | -------- | ------------------------------ |
| short (required) | `string` | The short URL, must exist. |

#### Response

```ts
// The deleted URL
{
  "name": String
  "actual": String
  "short": String
  "clicks": Number
}
```

### Standard Error Response

Request related errors will have a status code of 400 (Bad Request) and will contain an array of strings describing the issues with the request.

```ts
{
  "data": {
    "errors": String[]
  }
}
```
