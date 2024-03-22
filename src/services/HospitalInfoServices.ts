import HospitalInfo from "../models/HospitalInfo";
import RandomGenerator from "../utils/RandomGenerator";

function getHospitalInfo(): HospitalInfo {
    const hospitalNumberEnvVariable = process.env.CODA_SITE_API_HOSPITAL_CODE ? process.env.CODA_SITE_API_HOSPITAL_CODE : process.env.CODA19_SITE_API_HOSPITAL_CODE as string;
    const hospitalNumber = hospitalNumberEnvVariable ? hospitalNumberEnvVariable : '110';

    const positiveTests = RandomGenerator.getRandomInt(5000);
    const totalPatients = RandomGenerator.getRandomInt(1000);

    const patientsInIntensiveCareRate = Math.random();
    const totalPatientsInIntensiveCare = Math.floor(patientsInIntensiveCareRate * totalPatients);

    const totalBeds = Math.floor(totalPatients / 2);
    const remainingBeds = totalBeds - (Math.floor(totalBeds * patientsInIntensiveCareRate));

    const covid_cases = RandomGenerator.getRandomInt(1000);
    const death = RandomGenerator.getRandomInt(1000);
    const ventilator = RandomGenerator.getRandomInt(1000);
    const icu = RandomGenerator.getRandomInt(1000);

    return {
        hospitalNumber,
        positiveTests,
        totalPatients,
        totalPatientsInIntensiveCare,
        remainingBeds,
        covid_cases,
        death,
        ventilator,
        icu,
    }
}

export default {
    getHospitalInfo
}
