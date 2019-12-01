import dotenv from 'dotenv';

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
    SHORTTERM_STATUS: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${process.env.WEATHER_SERVICE_KEY}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`,
    SHORTTERM_FORECAST: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${process.env.WEATHER_SERVICE_KEY}&nx=61&ny=127&pageNo=1&numOfRows=25&_type=json`,
    SPACE_FORECAST: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${process.env.WEATHER_SERVICE_KEY}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`
  }
};
