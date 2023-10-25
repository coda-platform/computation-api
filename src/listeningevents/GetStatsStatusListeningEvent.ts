import StatsServices from "../services/StatsServices";
import WebSocketAdapter from "../utils/WebSocketAdapter";
import WebSocketEventListener from "../utils/WebSocketEventListener";

export default class GetStatsStatusListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'getStatsStatus';
    }

    callback(args: { eventId: string, body: any }) {
        StatsServices.getAPIStatus()
            .then(data => WebSocketAdapter.emit('sendStatsStatus', args.eventId, { siteInfo: data }))
    }
}