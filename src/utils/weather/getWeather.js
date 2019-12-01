import axios from 'axios';
import configs from '../../configs/index';
import { shortTermDate, shortTermTime } from './getShortTermTime';
import { spaceDate, spaceTime } from './getSpaceTime';


// 날짜와 시간을 받아 기상청api로 기상 정보 받아오는 부분
async function getWeather() {
  // 초단기 실황
  const url1 = `${configs.URL.SHORTTERM_STATUS}&base_date=${shortTermDate()}&base_time=${shortTermTime()}`;
  // 초단기 예보
  const url2 = `${configs.URL.SHORTTERM_FORECAST}&base_date=${shortTermDate()}&base_time=${shortTermTime()}`;
  // 동네 예보
  const url3 = `${configs.URL.SPACE_FORECAST}&base_date=${spaceDate()}&base_time=${spaceTime()}`;

  let liveWeather = {};
  let forecastWeather = {};
  let spaceWeather = {};
  let rows = 0;

  await axios.get(url1).then((response) => {
    liveWeather = response.data.response.body.items.item;
  });

  await axios.get(url2).then((response) => {
    forecastWeather = response.data.response.body.items.item;
  });

  await axios.get(url3).then((response) => {
    spaceWeather = response.data.response.body.items.item;
    rows = response.data.response.body.totalCount;
  });

  const weatherData = {
    liveWeather,
    forecastWeather,
    spaceWeather,
    rows
  };
  return weatherData;
}


export default getWeather;
