import moment from 'moment-timezone';

// 요청받은 시각의 서울 시각
function seoulTime() {
  const date = moment().tz('Asia/Seoul');

  return date;
}

// 동네예보 basedate설정
function spaceDate() {
  let today = seoulTime();

  if (parseInt(today.format('HH'), 10) < 3) {
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

  if (parseInt(today.format('HH'), 10) < 3) {
    hours = '2300';
  }

  return hours;
}

export { spaceDate, spaceTime };
