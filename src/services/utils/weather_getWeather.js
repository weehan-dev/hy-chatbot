import axios from 'axios';
import handleDate from './weather_handleDate';
import handleTime from './weather_handleTime';
import { spaceDate, spaceTime } from './weather_space';


// 날짜와 시간을 받아 기상청api로 기상 정보 받아오는 부분
async function getWeather() {
  const servicekey = process.env.serviceKey;

  const basedate = handleDate();
  console.log('basedate', basedate);
  const basetime = `${handleTime()}00`;
  console.log('basetime', basetime);

  const spacedate = spaceDate();
  console.log('spacedate', spacedate);
  const spacetime = spaceTime();
  console.log('spacetime', spacetime);

  // 초단기 실황
  const url1 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
  // 초단기 예보
  const url2 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=25&_type=json`;
  // 동네 예보
  const url3 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${servicekey}&base_date=${spacedate}&base_time=${spacetime}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`;

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
