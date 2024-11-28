import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object

export const initSocket = async () => {
    const options = {
        'force new connection' : true,
        reconnectionAttempt: 'Infinity',
        timeout:10000,
        transports: ['websocket']
    }
    return io(import.meta.env.VITE_BACKEND_URL, options)
}