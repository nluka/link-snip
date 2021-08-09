# url-y

A URL shortener with a REST api and front-end. Built with Node.js, Express, MongoDB, Bootstrap 5.

- [Servers](#servers)
- [API Reference](#api-reference)
  - [Get all URLs](#get-all-urls)
  - [Create new URL](#create-new-url)
  - [Update existing URL](#update-existing-url)
  - [Delete existing URL](#delete-existing-url)

## Servers

| Name       | URL                                                                  | Description                                                                                                                 |
| ---------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Production | [https://link-snip.herokuapp.com/](https://link-snip.herokuapp.com/) | The primary server. Note that it may take some time to respond to the first call, as the free heroku server is starting up. |

## API Reference

### Get all URLs

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

### Create new URL

```HTTP
POST /api/create
```

#### Query parameters

| Parameter         | Type     | Description                                |
| ----------------- | -------- | ------------------------------------------ |
| short (required)  | `string` | The shortened URL, must not already exist. |
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

### Update existing URL

```HTTP
PATCH /api/update
```

#### Query parameters

| Parameter        | Type     | Description                    |
| ---------------- | -------- | ------------------------------ |
| short (required) | `string` | The shortened URL, must exist. |
| \*newName        | `string` | The new short name.            |
| \*newActual      | `string` | The new full URL.              |

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

### Delete existing URL

```HTTP
DELETE /api/delete
```

#### Query parameters

| Parameter        | Type     | Description                    |
| ---------------- | -------- | ------------------------------ |
| short (required) | `string` | The shortened URL, must exist. |

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
