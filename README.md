# url-y

A URL shortener with a REST api and front-end. Built with Node.js, Express, MongoDB, Bootstrap 5.

- [Servers](#servers)
- [API Reference](#api-reference)
  - [Get all shortened URLs](#get-all-shortened-urls)
  - [Add new URL](#add-new-url)
  - [Update existing URL](#update-existing-url)
  - [Delete existing URL](#delete-existing-url)

## Servers

| Name       | URL                                                          | Description                                                                                                                 |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Production | [https://link-snip.herokuapp.com/](https://link-snip.herokuapp.com/) | The primary server. Note that it may take some time to respond to the first call, as the free heroku server is starting up. |

## API Reference

### Get all shortened URLs

```HTTP
GET /api/
```

#### Response

```ts
// An array of the currently stored URLs
[
  {
    "name": string
    "shortUrl": string
    "fullUrl": string
    "clicks": number
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
  "name": string
  "shortUrl": string
  "fullUrl": string
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
| \*newName           | `string` | The new short name.            |
| \*newFullUrl        | `string` | The new full URL.              |

\*At least one tagged parameters must be provided.

#### Response

```ts
// The updated item
{
  "name": string
  "shortUrl": string
  "fullUrl": string
  "clicks": number
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
  "name": string
  "shortUrl": string
  "fullUrl": string
  "clicks": number
}
```
