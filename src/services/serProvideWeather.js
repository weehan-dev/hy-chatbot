// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import getWeather from './utils/weather_getWeather'


async function handleWeather() {
    let weatherData = await getWeather();
    console.log("데이터 로딩 끝");

    //현재 기온
    for (let i = 0; i < 8; i++) {
        if (weatherData.liveWeather[i].category === "T1H") {
            var temperature = weatherData.liveWeather[i].obsrValue;
            break;
        };
    }

    //현재 강수
    for (let i = 0; i < 8; i++) {
        if (weatherData.liveWeather[i].category === "PTY") {
            var isRaining = weatherData.liveWeather[i].obsrValue;
            break;
        };
    }

    //하늘 상태
    let sky;
    switch (isRaining) {
        case 0:
            break;
        case 1:
            sky = "비";
            break;
        case 2:
            sky = "진눈개비";
            break;
        case 3:
            sky = "눈";
            break;
        case 4:
            sky = "소나기";
            break;
    }

    //비가 안 올 때
    let i = 0;
    while (!isRaining) {
        console.log(i);
        if (weatherData.forecastWeather[i].category === "SKY") {
            sky = weatherData.forecastWeather[i].fcstValue;
            break;
        };
        i++;
    }

    switch (sky) {
        case 1:
            sky = "맑음";
            break;
        case 3:
            sky = "구름 많음";
            break;
        case 4:
            sky = "흐림";
            break;
    }

    console.log("하늘 끝");

    //최고 기온
    for (let j = 0; j < 150; j++) {
        if (weatherData.spaceWeather[j].category === "TMX") {
            var high = weatherData.spaceWeather[j].fcstValue;
            break;
        }
    }

    console.log("최고 끝")
    //최저 기온
    for (let j = 0; j < 150; j++) {
        if (weatherData.spaceWeather[j].category === "TMN") {
            var low = weatherData.spaceWeather[j].fcstValue;
            break;
        }
    }

    console.log("최저 끝")

    //강수 확률
    let percent=0;
    console.log("rows:",weatherData.rows);
    for (let j = 0; (j < 175) && (j<weatherData.rows); j++) {
        if (weatherData.spaceWeather[j].category === "POP" && (weatherData.spaceWeather[j].fcstValue>percent)) {
            percent = weatherData.spaceWeather[j].fcstValue;
        }
    };


    const probability = isRaining ? undefined : `오늘 강수확률 : ${percent}%`;

    let message=undefined;

    if (percent>50){
        message="오늘 비 올 확률이 높아요! 우산 잊지 마세요!"
    }


    //최종 전송 데이터
    let weather = {
        high: high,
        low: low,
        temperature: temperature,
        sky: sky,
        probability: probability, //비가 오고 있을 때는 항목 삭제
        message: message
    }

    console.log("result");

    return weather;
}



export default handleWeather;