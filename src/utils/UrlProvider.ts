function getPurpleVMRestEndpoint(endPoint: string) {
    const hubApiURL = process.env.CODA_HUB_API_URL ? process.env.CODA_HUB_API_URL : process.env.CODA19_SITE_API_HUB_API_URL;
    return `${hubApiURL}/${endPoint}`;
}

export default {
    getPurpleVMRestEndpoint
}