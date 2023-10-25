import axios from "axios";
import version from "../utils/version";

const statsApiUrl = process.env.CODA_STATS_API_URL;

function getStatsErrorProcessed(action: string, error: any) {
    const statsApiConnectionFailure = `Could not receive or parse response from stats api url ${statsApiUrl}`;

    if (!error.response) {
        return {
            siteApiVersion: version.getBuildVersion(),
            action,
            error: statsApiConnectionFailure,
        }
    }

    return { siteApiVersion: version.getBuildVersion(), error: error.response.data };
}

async function summarize(payload: any): Promise<any> {
    try {
        const uri = `${process.env.CODA_STATS_API_URL}/stats/summarize`;

        const response = await axios.post(uri, payload);
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getStatsErrorProcessed('/stats/summarize', error);
    }
}

async function breakdown(payload: any): Promise<any> {
    try {
        const uri = `${process.env.CODA_STATS_API_URL}/stats/summarizeBreakdown`;

        const response = await axios.post(uri, payload);
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getStatsErrorProcessed('/stats/summarizeBreakdown', error);
    }
}

export default {
    summarize, breakdown
}