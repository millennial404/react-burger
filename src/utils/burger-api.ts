import {BASE_URL} from './constants';
import Cookies from 'js-cookie';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
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

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}


export const getIngredientsData = () => request("ingredients");

type TOrderRes =
  {
    success: boolean;
    name: string;
    order: {
      number: number;
    }
  }

export function placeAnOrder(arrayIngredients: string[]): Promise<TOrderRes> {
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

export type TRegisterUserArg = {
  password: string;
  email: string;
  name: string;
}

type TRegisterUserRes = {
  success: boolean;
  user:
    {
      email: string;
      name: string;
    }
  accessToken: string;
  refreshToken: string;
}

export function registerUser({password, email, name}: TRegisterUserArg): Promise<TRegisterUserRes> {
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

type TUserData = {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export function updateUserData({name, login, password}: TUpdateUserData): Promise<TUserData> {
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

export function getUserData(): Promise<TUserData> {
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