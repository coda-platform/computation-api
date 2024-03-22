import { HttpsProxyAgent } from 'https-proxy-agent';
import io from 'socket.io-client';


function get() {

    const proxy = process.env.CODA_SITE_API_PROXY_URL ? process.env.CODA_SITE_API_PROXY_URL :process.env.CODA19_SITE_API_PROXY;
    let opts: any;

    if (proxy) {
        console.log(`Using ${proxy} proxy for web socket http requests`);
        opts = { agent: new HttpsProxyAgent(proxy) as any };
    } else {
        console.log(`Using vanilla http requests`);
    }


    const serverHost = process.env.CODA_HUB_API_URL ? process.env.CODA_HUB_API_URL : process.env.CODA19_SITE_API_HUB_API_URL as string;
    return io(serverHost, opts);
}

export default { get }