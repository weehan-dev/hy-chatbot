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
    LIBRARY: 'https://lib.hanyang.ac.kr/smufu-api/pc/1/rooms-at-seat/',
    DIET: 'http://app.ucan.or.kr/api/diet/hanyang/20191122/'
  }
};
