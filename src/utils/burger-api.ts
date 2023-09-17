import {BASE_URL} from './constants';
import Cookies from 'js-cookie';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (endpoint: string, options: RequestInit) => {
  try {
    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData: { [key: string]: string } = await refreshToken();
      Cookies.set("refreshToken", refreshData.refreshToken);
      Cookies.set("accessToken", refreshData.accessToken);
      if (options.headers) {
        (options.headers as { [key: string]: string }).Authorization = refreshData.accessToken;
      }
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

const checkSuccess = (res: unknown): { [key: string]: string } | Promise<never> => {
  if (res && typeof res === 'object' && 'success' in res) {
    return res as { [key: string]: string };
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}


export const getIngredientsData = () => request("ingredients");

export function placeAnOrder(arrayIngredients: string[]) {
  return fetchWithRefresh("orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: Cookies.get('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: arrayIngredients
    })
  })
}

export function passwordReset(email: string) {
  return request("password-reset", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    } as HeadersInit,
    body: JSON.stringify({
      "email": email
    })
  })
}

export function confirmationPasswordReset(password: string, token: string) {
  return request("password-reset/reset", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    } as HeadersInit,
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}

export type TRegisterUser = {
  password: string;
  email: string;
  name: string;
}

export function registerUser({password, email, name}: TRegisterUser) {
  return request("auth/register", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    } as HeadersInit,
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    })
  })
}

export function loginRequest({password, email}: { password: string, email: string }) {
  return request("auth/login", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    } as HeadersInit,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  });
}

type TUpdateUserData = {
  name: string;
  login: string;
  password: string;
}

export function updateUserData({name, login, password}: TUpdateUserData) {
  return fetchWithRefresh("auth/user", {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('accessToken')
    } as HeadersInit,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "name": name,
      "email": login,
      "password": password
    })
  });
}

export function getUserData() {
  return fetchWithRefresh("auth/user", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('accessToken')
    } as HeadersInit,
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
}

export function refreshToken() {
  return request("auth/token", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    } as HeadersInit,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": Cookies.get('refreshToken')
    })
  });
}

export function logoutRequest() {
  return request("auth/logout ", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    } as HeadersInit,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": Cookies.get('refreshToken')
    })
  });
}