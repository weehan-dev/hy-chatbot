import dotenv from 'dotenv';

import * as weatherUrl from './weatherUrl';

dotenv.config();

export default {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB: {
    NAME: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    TYPE: process.env.DB_TYPE,
    PASSWORD: process.env.DB_PASSWORD,
    USERNAME: process.env.DB_USERNAME
  },
  URL: {
    LIBRARY: 'https://lib.hanyang.ac.kr/smufu-api/pc/1/rooms-at-seat',
    DIET: 'http://app.ucan.or.kr/api/diet/hanyang/',
    SHORTTERM_STATUS: weatherUrl.getShortTermStatus(process.env.WEATHER_SERVICE_KEY),
    SHORTTERM_FORECAST: weatherUrl.getShortTermForecast(process.env.WEATHER_SERVICE_KEY),
    REGION_FORECAST: weatherUrl.getRegionForecast(process.env.WEATHER_SERVICE_KEY)
  }
};
