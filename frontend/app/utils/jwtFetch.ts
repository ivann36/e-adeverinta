export async function jwtFetch(
  url: string,
  callbackRedirect: Function,
  method: string,
  body?: Object
): Promise<Response> {
  const token = localStorage.getItem("access_token");

  if (token == null) {
    callbackRedirect("/");
  }
  let res;
  if (body) {
    res = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } else {
    res = await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  if (!res.ok) {
    callbackRedirect("/refresh");
  }
  return res;
}
