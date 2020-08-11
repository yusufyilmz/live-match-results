import { realTimeDataUpdated } from "../context/actions";
import io from 'socket.io-client';

export const initSockets = ({ dispatch, state }: any) => {

    const socket = io(`http://localhost:5000?id=${state.id}`);

    socket.on("message", function(data: any) {
        dispatch(realTimeDataUpdated(data))
      });
};