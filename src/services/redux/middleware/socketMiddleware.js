export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen});
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose});
        };

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }
      }
      next(action);
    };
  };
};