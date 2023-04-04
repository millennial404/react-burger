function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}


export function getIngredientsData(url) {
  return request(url)
}

export function placeAnOrder(arrayIngredients) {
  return request("https://norma.nomoreparties.space/api/orders", {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ingredients: arrayIngredients
    })
  })
}