import axios from "axios";
import { getLogger, getRedisClient, schedule } from "utils";

const logger = getLogger("city");

export type Country = {
  name: string;
  population: number;
  cca2: string;
};

export type City = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
};

const {
  API_NINJA_URL: citiesUrl = "",
  REST_COUNTRIES_URL: countriesUrl = "",
  MIN_CITY_POPULATION: minCityPop = 100000,
  MIN_COUNTRY_POPULATION: minCountryPop = 100000,
  API_NINJA_KEY: apiKey,
} = process.env;

const getRandomIndex = (num: number) => {
  return Math.floor(Math.random() * num);
};

export const getCountryCode = async () => {
  try {
    logger.info("Getting random country code");
    const response = await axios.get(
      `${countriesUrl}/all?fields=cca2,population,name`
    );
    const countries = response.data as Country[];
    const filteredCountries = countries.filter(
      ({ population }) => population >= Number(minCountryPop)
    );
    const index = getRandomIndex(filteredCountries.length);
    const { cca2 }: Country = filteredCountries[index];
    logger.info(`Recieved country code: ${cca2}`);
    return cca2;
  } catch (error) {
    throw error;
  }
};

export const getCityFromApi = async () => {
  try {
    const countryCode = await getCountryCode();
    logger.info(`Getting city for country code: ${countryCode}`);
    const response = await axios.get(
      `${citiesUrl}/city?country=${countryCode}&min_population=${minCityPop}&limit=30`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );
    const cities = response.data as City[];
    const filteredCities = cities
      .filter(({ name }) => name.length <= 8)
      .map(({ name }) => name.replace(/\s/g, "").toLowerCase());
    const index = getRandomIndex(filteredCities.length);
    const name: City["name"] = filteredCities[index];
    logger.info(`Recieved city: ${name}`);
    return name;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const setupCron = async () => {
  schedule(async () => {
    const city = await getCityFromApi();
    const { storeInRedis } = await getRedisClient();
    await storeInRedis("current-city", city);
  });
};

export const getCurrentCityFromRedis = async () => {
  const { getFromRedis } = await getRedisClient();
  const city = await getFromRedis("current-city");
  return city;
};

export const storeCityInRedis = async (city: string) => {
  const { storeInRedis } = await getRedisClient();
  await storeInRedis("current-city", city);
};
