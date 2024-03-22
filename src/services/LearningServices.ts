import axios from "axios";
import version from "../utils/version";

const learningApiUrl = process.env.CODA_LEARNING_API_URL ? process.env.CODA_LEARNING_API_URL : process.env.CODA19_SITE_API_LEARNING_API_ENDPOINT;

async function getAPIStatus() {
    const uri = `${learningApiUrl}/`;

    try {
        const response = await axios.get(uri);
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getLearningErrorProcessed('/', error);
    }
}

function getLearningErrorProcessed(action: string, error: any) {
    const learningApiConnectionFailure = `Could not receive or parse response from learning api url ${learningApiUrl}`;

    if (!error.response) {
        return {
            siteApiVersion: version.getBuildVersion(),
            action,
            error: learningApiConnectionFailure,
        }
    }

    return { siteApiVersion: version.getBuildVersion(), error: error.response.data };
}

async function prepare(payload: any): Promise<any> {
    const uri = `${learningApiUrl}/learning/prepare`;

    try {
        const response = await axios.post(uri, payload);
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getLearningErrorProcessed('/learning/prepare', error);
    }
}

async function train(payload: any): Promise<any> {
    const uri = `${learningApiUrl}/learning/train`;

    try {
        const response = await axios.post(uri, payload, {
            maxBodyLength: 1048576000,
            maxContentLength: 1048576000
        })
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getLearningErrorProcessed('/learning/train', error);
    }
}

async function evaluate(payload: any): Promise<any> {
    const uri = `${learningApiUrl}/learning/evaluate`;

    try {
        const response = await axios.post(uri, payload);
        const data = response.data ? response.data : response;

        return data;
    }
    catch (error) {
        return getLearningErrorProcessed('/learning/evaluate', error);
    }
}

export default {
    prepare,
    train,
    evaluate,
    getAPIStatus
}