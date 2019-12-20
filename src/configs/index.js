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
    SPACE_FORECAST: `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${process.env.WEATHER_SERVICE_KEY}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`,
    SUNNY_IMAGE: 'https://user-images.githubusercontent.com/52434876/71237703-d026a600-2349-11ea-8e79-14f0aed22118.jpg',
    CLOUDY_IMAGE: 'https://user-images.githubusercontent.com/52434876/71237699-cf8e0f80-2349-11ea-8bf0-4d21f791c822.jpg',
    RAINY_IMAGE: 'https://user-images.githubusercontent.com/52434876/71237700-d026a600-2349-11ea-9bd0-975f46f5d8ff.jpg',
    SNOWY_IMAGE: 'https://user-images.githubusercontent.com/52434876/71237701-d026a600-2349-11ea-835a-a7bbbb62a7c2.jpg'
  }
};
