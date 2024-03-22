
import axios from 'axios';

import ResourceInfo from "../models/ResourceInfo";
import SiteInfo from "../models/SiteInfo";

interface Dictionary<T> {
    [Key: string]: T;
}

const statsApiUrl = process.env.CODA_STATS_API_URL ? process.env.CODA_STATS_API_URL : process.env.CODA19_SITE_API_STATS_API_ENDPOINT;

function mockResource(type: string, attribute: string, datatype: string): ResourceInfo {
    const begin_date: Date = new Date(2020, 0, 1);
    const end_date: Date = new Date(2021, 0, 1);

    return {
        type,
        attribute,
        begin_date,
        end_date,
        datatype,
    }
}

export async function getSiteInfo(): Promise<SiteInfo> {
    console.log('Get site info at ', statsApiUrl);

    const hospitalNumberEnvVariable = process.env.CODA_SITE_API_HOSPITAL_CODE ? process.env.CODA_SITE_API_HOSPITAL_CODE : process.env.CODA19_SITE_API_HOSPITAL_CODE as string;
    const hospitalNumber = hospitalNumberEnvVariable ? hospitalNumberEnvVariable : '110';

    const uid: string = hospitalNumber;

    const names: Dictionary<string> = { 'fr': `Hôpital ${hospitalNumber}`, 'en': `${hospitalNumber} Hospital` };
    const name: string = names['en'];
    const api_version: string = "1.0.1";

    const resources = await (statsApiUrl ? getResources : getMockedResources)();

    return {
        uid,
        name,
        names,
        api_version,
        resources
    }
}

async function getMockedResources(): Promise<ResourceInfo[]> {
    return [
        mockResource("patient", "age", "number"),
        mockResource("patient", "sex", "string"),
        mockResource("episode", "los", "number"),
    ]
}

async function getResources(): Promise<ResourceInfo[]> {
    const response = await axios.get(`${statsApiUrl}/resources`);
    const data = response.data;

    return data?.resources as ResourceInfo[];
}

async function getAidboxInfo(): Promise<any> {
    const response = await axios.get(`${statsApiUrl}/resources/health`);
    return response.data;
}

export default {
    getSiteInfo, getAidboxInfo
}