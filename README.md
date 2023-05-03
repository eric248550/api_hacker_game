Play link: https://api-hacker-hame.vercel.app/

<h1 align="center">Game content</h1>

### Broken Object Level Authorization
An e-commerce platform for online stores (shops) provides a listing page with the items for their hosted shops. Inspecting the browser requests, an attacker can identify the API endpoints used as a data source for those charts and their pattern `/eshop/items/{owner_name}`. 

Using another API endpoint, the attacker can get the list of all hosted shop names. With a simple script to manipulate the names in the list, replacing `{owner_name}` in the URL, the attacker gains access to the sales data of thousands of e-commerce stores.
- [OWASP API Security Project](https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa1-broken-object-level-authorization.md)
- [live demo](https://api-hacker-hame.vercel.app/level2)

### Excessive Data Exposure
An e-commerce platform `/eshop/AllItems` endpoint view to render all shop metadata. 

An attacker finds out that other sensitive data related to other’s items is also returned. The endpoint implementation uses a generic `toJSON()` method on the `User` model, which contains PII, to serialize the object.
- [OWASP API Security Project](https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa3-excessive-data-exposure.md)
- [live demo](https://api-hacker-hame.vercel.app/level3)

### Lack of Resources & Rate Limiting
We have an application that call `/eshop/AllItems` to get all items in the shop. 

An attacker keep calling the endpoints, causing performance issues on the database. Meanwhile, the API becomes unresponsive and is unable to handle further requests from this or any other clients (aka DoS).
- [OWASP API Security Project](https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa4-lack-of-resources-and-rate-limiting.md)
- [live demo](https://api-hacker-hame.vercel.app/level4)

### Broken Function Level Authorization
The user profile update application triggers an API call to `POST /eshop/user/update` with json `{display_name: 'eric',username: 'eric248550',password: 'pass123',role: 'shop owner',balance: 100}`. 

An attacker use the endpoint and manipulated the HTTP method and endpoint to `POST /eshop/user/update` with json `{display_name: 'eric',username: 'eric248550',password: 'pass123',role: 'admin',balance: 100}. 

This endpoint should only be accessed by administrators using the admin console, which does not implement function level authorization checks. The attacker exploits the issue and sends himself an invite to create an admin account:
- [OWASP API Security Project](https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa4-lack-of-resources-and-rate-limiting.md)
- [live demo](https://api-hacker-hame.vercel.app/level5)

### Improper Assets Management
After redesigning their applications, a local search service left an old API version (`api.someservice.com/`) running, unprotected, and with access to the user database. While targeting one of the latest released applications, an attacker found the API address (`api.someservice.com/v2`). Replacing `v2` with `v1` in the URL gave the attacker access to the old, unprotected API, exposing the personal identifiable information (PII) of over 100 Million users.

- [OWASP API Security Project](https://raw.githubusercontent.com/OWASP/API-Security/master/2019/en/src/0xa9-improper-assets-management.md)
- [live demo](https://api-hacker-hame.vercel.app/level6)

### SQL Injection
We have an application with basic CRUD functionality for operations with get user. An attacker managed to identify that SQL injection might be possible through `userName` query string parameter in the delete booking request. This is how the request looks like: `GET /eshop/sql/getUser/{username}'`.

The API server uses the following function to SQL requests:

```javascript
app.get('/eshop/sql/getUser/:userName', cors, async (req, res) => {
    try {
        const { userName } = req.params;

        const user = await utils.postgreDB_530(`SELECT * FROM shop_member WHERE username='${userName}'`);

        res.status(200).send(user[0]);
    }
    catch (e) {
        console.error(e);
        res.status(500).send({
            "error": 'unexpected error',
        });
    }
});
```

The attacker intercepted the request and changed `username` query string parameter. In this case, the attacker managed to get another user's data or delete some data:
- [OWASP API Security Project](https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa8-injection.md)
- [live demo](https://api-hacker-hame.vercel.app/level7)

<h1 align="center">Host API hacker game</h1>

### Installation

```
$ npm install
```

### Local Development

```
$ npm run dev
```

This command starts a local development webpack server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `dist` directory and can be served using any static contents hosting service.

### Production

```
$ npm run start
```

This command serve the static content `dist` directory with a nodejs express server.
