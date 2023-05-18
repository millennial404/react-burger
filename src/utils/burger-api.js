import {BASE_URL} from './constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

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
  return request("orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
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
};