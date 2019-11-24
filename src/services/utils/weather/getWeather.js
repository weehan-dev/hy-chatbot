import axios from 'axios';
import configs from '../../../configs/index';


// 날짜와 시간을 받아 기상청api로 기상 정보 받아오는 부분
async function getWeather() {
  // 초단기 실황
  const url1 = configs.URL.WEATHER1;
  // 초단기 예보
  const url2 = configs.URL.WEATHER2;
  // 동네 예보
  const url3 = configs.URL.WEATHER3;

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
