import {BASE_URL} from './constants';
import Cookies from 'js-cookie';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options); //делаем запрос
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      Cookies.set("refreshToken", refreshData.refreshToken);
      Cookies.set("accessToken", refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options); //вызываем перезапрос данных
    } else {
      return Promise.reject(err);
    }
  }
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
}


export const getIngredientsData = () => request("ingredients");

export function placeAnOrder(arrayIngredients) {
  return fetchWithRefresh("orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: Cookies.get('accessToken')
    },
    body: JSON.stringify({
      ingredients: arrayIngredients
    })
  })
}

export function passwordReset(email) {
  return request("password-reset", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      "email": email
    })
  })
}

export function confirmationPasswordReset(password,token) {
  return request("password-reset/reset", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      "password": password,
      "token": token
    })
  })
}

export function registerUser ({password, email, name}) {
  return request("auth/register", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    })
  })
}

export function loginRequest({password,email}) {
  return request("auth/login", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "email": email,
      "password": password
    })
  });
}

export function updateUserData({name, login, password}) {
  return fetchWithRefresh("auth/user", {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: Cookies.get('accessToken')
    },
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
    },
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
    },
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
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      "token": Cookies.get('refreshToken')
    })
  });
}