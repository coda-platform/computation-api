import KeycloakApi from '../api/KeycloakApi';
import SocketIoFactory from './SocketIoFactory';
import WebSocketEventListener from './WebSocketEventListener';

const socket = SocketIoFactory.get();

const siteCode = process.env.CODA_SITE_API_HOSPITAL_CODE;

socket.on("connect", function () {
    console.log('Connected to web socket server.');
    socket.emit('storeClientInfo', { siteCode })
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

async function emit(event: string, eventId: string, ...args: any[]) {
    const token = await KeycloakApi.logIn();
    const result = { token, clientId: socket.id, eventId, siteCode, ...args[0] };

    console.warn(`⚡️[coda-site-api]: Emitting ${event} event.`);
    socket.emit(event, result);
}

function registerListeningEvents(events: WebSocketEventListener[]) {
    events.forEach((e) => socket.on(e.listeningEvent, e.callback as any))
}

export default {
    emit,
    registerListeningEvents
}
