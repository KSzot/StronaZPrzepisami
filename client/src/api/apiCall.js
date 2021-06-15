import _ from "lodash";
export async function fetchApi(path, params) {
  const API_URL = "http://localhost:3001";
  if (!_.isObject(params.headers)) {
    params.headers = {};
    params.headers["Content-Type"] = "application/json";
  }

  if (typeof params.body === "object") {
    params.body = JSON.stringify(params.body);
  }

  const response = await fetch(API_URL + path, params);

  if (response.ok) {
    return await response.json();
  }
  throw await response.json();
}
