import {getIngredientsData} from "../../utils/burger-api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

const urlApi = "https://norma.nomoreparties.space/api/ingredients";
export function getIngredients() {
  // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function (dispatch) {
    // Проставим флаг в хранилище о том, что мы начали выполнять запрос
    // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать
    // ввод на время выполнения запроса
    dispatch({
      type: GET_INGREDIENTS
    })
    // Запрашиваем данные у сервера
    getIngredientsData(urlApi).then(res => {
      if (res && res.success) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    }).catch(err => {
      // Если сервер не вернул данных, также отправляем экшен об ошибке
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    })
  }
}