function spaceDate() {
  const today = new Date();

  if (today.getHours() < 3) {
    today.setDate(today.getDate() - 1);
  }

  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2);
  //   const month = ('0' + (today.getMonth() + 1)).slice(-2);

  const day = (`0${today.getDate()}`).slice(-2);

  const date = `${year}${month}${day}`;

  return date;
}

function spaceTime() {
  const today = new Date();
  let hours = '0200';

  if (today.getHours() < 3) {
    hours = '2300';
  }

  return hours;
}

// 기상청 api에 넣을 시간 파라미터 반환 함수
function handleTime() {
  const today = new Date();
  const minutes = today.getMinutes();

  if (minutes < 45) {
    today.setHours(today.getHours() - 1);
  }

  const hours = (`0${today.getHours()}`).slice(-2);

  return hours;
}

// 기상청 api에 넣을 날짜 파라미터 반환 함수
function handleDate() {
  const today = new Date();

  const minutes = today.getMinutes();

  if (minutes < 45) {
    today.setHours(today.getHours() - 1);
  }

  const year = today.getFullYear();
  const month = (`0${today.getMonth() + 1}`).slice(-2);
  const day = (`0${today.getDate()}`).slice(-2);

  const date = `${year}${month}${day}`;
  return date;
}

export function getRegionForecast(serviceKey) {
  const spacedate = spaceDate();
  const spacetime = spaceTime();

  // 동네 예보
  const regionForecastUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${serviceKey}&base_date=${spacedate}&base_time=${spacetime}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`;

  return regionForecastUrl;
}

export function getShortTermForecast(serviceKey) {
  const basedate = handleDate();
  const basetime = `${handleTime()}00`;

  // 초단기 예보
  const shortTermForecastUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${serviceKey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=25&_type=json`;
  return shortTermForecastUrl;
}

export function getShortTermStatus(serviceKey) {
  const basedate = handleDate();
  const basetime = `${handleTime()}00`;

  // 초단기 실황
  const shortTermStatusUrl = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${serviceKey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
  return shortTermStatusUrl;
}
