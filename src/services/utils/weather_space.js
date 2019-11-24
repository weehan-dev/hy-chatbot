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
  console.log(date);

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


export { spaceDate, spaceTime };
