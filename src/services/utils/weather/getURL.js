import handleDate from './handleDate';
import handleTime from './handleTime';
import { spaceDate, spaceTime } from './spaceDateTime';
import configs from '../../../configs/index';

function getURL() {
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

  const urlList = {
    url1,
    url2,
    url3
  };

  configs.URL.WEATHER1 = url1;
  configs.URL.WEATHER2 = url2;
  configs.URL.WEATHER3 = url3;

  return urlList;
}


export default getURL;
