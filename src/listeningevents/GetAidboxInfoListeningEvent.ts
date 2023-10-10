import SiteInfoServices from "../services/SiteInfoServices";
import WebSocketAdapter from "../utils/WebSocketAdapter";
import WebSocketEventListener from "../utils/WebSocketEventListener";

export default class GetAidboxInfoListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'getAidboxInfo';
    }

    callback(args: { eventId: string }) {
        SiteInfoServices.getAidboxInfo()
            .then(data => WebSocketAdapter.emit('sendAidboxInfo', args.eventId, { siteInfo: data }))
    }
}