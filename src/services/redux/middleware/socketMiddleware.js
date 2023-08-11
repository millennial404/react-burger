export const socketMiddleware = (wsActions) => {

  return store => {
    let socket = null;
    return next => action => {
      let flag = true;
      const {dispatch} = store;
      const {type} = action;
      const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage, wsClose} = wsActions;
      let url = '';

      if (type === wsInit) {
        url = action.payload;
        socket = new WebSocket(url);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };

        socket.onerror = event => {
          dispatch({type: onError, payload: 'Error'});
        };

        socket.onmessage = event => {
          const {data} = event;
          const parsedData = JSON.parse(data);
          const {success, ...restParsedData} = parsedData;

          dispatch({type: onMessage, payload: restParsedData});
        };

        socket.onclose = () => {
          if (flag && url) {
            socket = new WebSocket(url);
          }else {
            dispatch({type: onClose});
          }
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsClose) {
          socket.close();
          socket = null;
          flag = false;
        }
      }
      next(action);
    };
  };
};