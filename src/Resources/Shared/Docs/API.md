# API

The Api file is a simple file that uses axios to create a new axios object
that is exported and can be used to create http requests like this:

```javascript
API.post('/auth/login', loginData);
```

You will usally use the API from the logic folders so the division of code would be like this: UI => Logic => API.

You can add middlewares to the api like those i added, one to add a token and one to extracte the response data and error.
