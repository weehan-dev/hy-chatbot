import moment from 'moment-timezone';


// 요청받은 시각의 서울 시각
function seoulTime() {
  const date = moment().tz('Asia/Seoul');

  return date;
}

// 동네예보 basedate설정
function spaceDate() {
  let today = seoulTime();

  if (today.format('HH') < 3) {
    today = today.add('-1', 'd');
  }

  const year = today.format('YYYY');
  const month = today.format('MM');
  const day = today.format('DD');

  const date = `${year}${month}${day}`;

  return date;
}

// 동네예보 basetime설정
function spaceTime() {
  const today = seoulTime();

  let hours = '0200';

  if (today.format('HH') < 3) {
    hours = '2300';
  }

  return hours;
}

// 초단기실황, 초단기예보 basedate설정
function handleDate() {
  let today = seoulTime();

  const minutes = today.format('mm');

  if (minutes < 45) {
    today = today.add('-1', 'h');
  }

  const year = today.format('YYYY');
  const month = today.format('MM');
  const day = today.format('DD');

  const date = `${year}${month}${day}`;

  return date;
}

// 초단기실황, 초단기예보 basetime설정
function handleTime() {
  let today = seoulTime();

  const minutes = today.format('mm');

  if (minutes < 45) {
    today = today.add('-1', 'h');
  }

  const hours = today.format('HH00');

  return hours;
}


export function getShortTermStatus(serviceKey) {
  const basedate = handleDate();
  const basetime = handleTime();

  // 초단기 실황
  const shortTermStatusUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${serviceKey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
  return shortTermStatusUrl;
}


export function getShortTermForecast(serviceKey) {
  const basedate = handleDate();
  const basetime = handleTime();

  // 초단기 예보
  const shortTermForecastUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${serviceKey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=25&_type=json`;
  return shortTermForecastUrl;
}


export function getRegionForecast(serviceKey) {
  const spacedate = spaceDate();
  const spacetime = spaceTime();

  // 동네 예보
  const regionForecastUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${serviceKey}&base_date=${spacedate}&base_time=${spacetime}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`;
  return regionForecastUrl;
}
