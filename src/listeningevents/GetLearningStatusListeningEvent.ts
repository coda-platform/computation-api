import LearningServices from "../services/LearningServices";
import WebSocketAdapter from "../utils/WebSocketAdapter";
import WebSocketEventListener from "../utils/WebSocketEventListener";

export default class GetLearningStatusListeningEvent implements WebSocketEventListener {
    listeningEvent: string;

    constructor() {
        this.listeningEvent = 'getLearningStatus';
    }

    callback(args: { eventId: string, body: any }) {
        LearningServices.getAPIStatus()
            .then(data => WebSocketAdapter.emit('sendLearningStatus', args.eventId, { siteInfo: data }))
    }
}