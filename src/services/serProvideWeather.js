// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import getWeather from '../utils/weather/getWeather';
import configs from '../configs/index';


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

  let imgUrl = 'https://cdn.cnn.com/cnnnext/dam/assets/190821152345-cat-lady-stock-exlarge-169.jpg';

  // 하늘 상태
  let sky;
  switch (isRaining) {
    case 0:
      break;
    case 1:
      sky = '비 🌧';
      imgUrl = configs.URL.RAINY_IMAGE;
      break;
    case 2:
      sky = '진눈개비 🌨';
      imgUrl = configs.URL.SNOWY_IMAGE;
      break;
    case 3:
      sky = '눈 ❄️';
      imgUrl = configs.URL.SNOWY_IMAGE;
      break;
    case 4:
      sky = '소나기 🌦';
      imgUrl = configs.URL.RAINY_IMAGE;
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
      imgUrl = configs.URL.SUNNY_IMAGE;
      break;
    case 3:
      sky = '구름 많음 🌥';
      imgUrl = configs.URL.CLOUDY_IMAGE;
      break;
    case 4:
      sky = '흐림 ☁️';
      imgUrl = configs.URL.CLOUDY_IMAGE;
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

  const probability = isRaining ? undefined : `\n오늘 강수확률 : ${percent}%`;

  let message = '"오늘도 좋은 하루 되세요 ☘"';

  if (percent > 50) {
    message = '"오늘 비 올 확률이 높아요!\n우산 잊지 마세요! ☂️"';
  }

  // 최종 전송 데이터
  const weather = {
    high,
    low,
    temperature,
    sky,
    probability, // 비가 오고 있을 때는 항목 삭제
    message,
    imgUrl
  };

  const data = {
    version: '2.0',
    template: {
      outputs: [
        {
          basicCard: {
            title: '지금 우리학교 날씨는',
            description: `현재 기온 ${weather.temperature} °c, 하늘 ${weather.sky}!
            
=======================
            
오늘 최고 기온 : ${weather.high} °c
오늘 최저 기온 : ${weather.low} °c${weather.probability}
            
=======================
            
${weather.message}`,
            thumbnail: {
              imageUrl: weather.imgUrl
            },
            buttons: [
              {
                action: 'webLink',
                label: '날씨 자세히 알아보기',
                webLinkUrl: 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EC%82%AC%EA%B7%BC%EB%8F%99+%EB%82%A0%EC%94%A8'
              }
            ]
          }
        }
      ]
    }
  };

  return data;
}


export default handleWeather;
