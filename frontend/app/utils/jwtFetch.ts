export async function refreshToken() {
  const token = localStorage.getItem("refresh_token");
  const role = localStorage.getItem("role");

  if (token == null) {
    throw new Error("No refresh token found");
  }
  if (role == "secretary") {
    const response = await fetch("/api/google-auth/refresh", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: token }),
    })
    if (!response.ok) {
      throw new Error("Error refreshing token")
    }
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  }
}
export async function jwtFetch(
  {
    url,
    method,
    callbackLogin,
    callbackRefreshToken = refreshToken,
    body,
  }:
    {
      url: string,
      method: string,
      callbackLogin?: Function,
      callbackRefreshToken?: Function,
      body?: Object
    }
): Promise<Response> {
  const token = localStorage.getItem("access_token");

  if (token == null) {
    if (callbackLogin)
      callbackLogin();
    throw new Error("No token found");
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
  if (res.status === 401) {
    if (callbackRefreshToken)
      console.log("refreshing token")
    callbackRefreshToken();
  }
  return res;
}
