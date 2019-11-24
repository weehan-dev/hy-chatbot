// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import getWeather from '../utils/weather/getWeather';


async function handleWeather() {
  const weatherData = await getWeather();

  // 현재 기온
  let temperature;
  for (let i = 0; i < 8; i += 1) {
    if (weatherData.liveWeather[i].category === 'T1H') {
      temperature = weatherData.liveWeather[i].obsrValue;
      break;
    }
  }

  // 현재 강수
  let isRaining;
  for (let i = 0; i < 8; i += 1) {
    if (weatherData.liveWeather[i].category === 'PTY') {
      isRaining = weatherData.liveWeather[i].obsrValue;
      break;
    }
  }

  // 하늘 상태
  let sky;
  switch (isRaining) {
    case 0:
      break;
    case 1:
      sky = '비 🌧';
      break;
    case 2:
      sky = '진눈개비 🌨';
      break;
    case 3:
      sky = '눈 ❄️';
      break;
    case 4:
      sky = '소나기 🌦';
      break;
    default:
      break;
  }

  // 비가 안 올 때
  let i = 0;
  while (!isRaining) {
    if (weatherData.forecastWeather[i].category === 'SKY') {
      sky = weatherData.forecastWeather[i].fcstValue;
      break;
    }
    i += 1;
  }

  switch (sky) {
    case 1:
      sky = '맑음 ☀️';
      break;
    case 3:
      sky = '구름 많음 🌥';
      break;
    case 4:
      sky = '흐림 ☁️';
      break;
    default:
      break;
  }

  // 최고 기온
  let high;
  for (let j = 0; j < 150; j += 1) {
    if (weatherData.spaceWeather[j].category === 'TMX') {
      high = weatherData.spaceWeather[j].fcstValue;
      break;
    }
  }

  // 최저 기온
  let low;
  for (let j = 0; j < 150; j += 1) {
    if (weatherData.spaceWeather[j].category === 'TMN') {
      low = weatherData.spaceWeather[j].fcstValue;
      break;
    }
  }

  // 강수 확률
  let percent = 0;
  for (let j = 0; (j < 175) && (j < weatherData.rows); j += 1) {
    if (weatherData.spaceWeather[j].category === 'POP' && (weatherData.spaceWeather[j].fcstValue > percent)) {
      percent = weatherData.spaceWeather[j].fcstValue;
    }
  }


  const probability = isRaining ? undefined : `오늘 강수확률 : ${percent}%`;

  let message;

  if (percent > 50) {
    message = '오늘 비 올 확률이 높아요!\n우산 잊지 마세요! ☂️';
  }


  // 최종 전송 데이터
  const weather = {
    high,
    low,
    temperature,
    sky,
    probability, // 비가 오고 있을 때는 항목 삭제
    message
  };

  return weather;
}


export default handleWeather;
