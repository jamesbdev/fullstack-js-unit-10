export const api = async (path, method = "GET", body = null, credentials = null) => {
  const url = "http://localhost:5000/api" + path;

  const options = {
    method,
    body,
    credentials,
    headers: {},
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }

  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }
  return fetch(url, options);
};

/* GET COURSES */

/* GET COURSE DETAIL */

/* CREATE COURSE */

/* UPDATE COURSE */

/* DELETE COURSE */
