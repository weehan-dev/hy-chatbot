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

export default handleDate;
