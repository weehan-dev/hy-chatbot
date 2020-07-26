import moment from 'moment-timezone';

// 요청받은 시각의 서울 시각
function seoulTime() {
  const date = moment().tz('Asia/Seoul');

  return date;
}

// 초단기실황, 초단기예보 basedate설정
function shortTermDate() {
  let today = seoulTime();

  const minutes = parseInt(today.format('mm'), 10);

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
function shortTermTime() {
  let today = seoulTime();

  const minutes = parseInt(today.format('mm'), 10);

  if (minutes < 45) {
    today = today.add('-1', 'h');
  }

  const hours = today.format('HH00');

  return hours;
}

export { shortTermDate, shortTermTime };
