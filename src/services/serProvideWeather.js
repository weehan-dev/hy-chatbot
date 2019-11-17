// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import axios from 'axios';


async function getWeather() {
    console.log("기상청api로 정보를 받아옴");


    const servicekey = process.env.serviceKey;
    let date = 20191117;
    let time = "2200";
    let spacetime = "0700";

    //초단기 실황
    let url1 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${servicekey}&base_date=${date}&base_time=${time}&nx=55&ny=127&pageNo=1&numOfRows=10&_type=json`;
    //초단기 예보
    let url2 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${servicekey}&base_date=${date}&base_time=${time}&nx=55&ny=127&pageNo=1&numOfRows=10&_type=json`;
    //동네 예보
    let url3 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${servicekey}&base_date=${date}&base_time=${spacetime}&nx=55&ny=127&pageNo=3&numOfRows=10&_type=json`;
      
    let weatherData;
    await axios.get(url1).then(response => {
        weatherData = response.data;
        console.log("1", weatherData);
    });
    
    console.log("2", weatherData);
    console.log(3);
    return weatherData;
}


function handleWeather() {
    console.log("받아온 정보를 하나의 데이터로 정리. 라우터에서 바로 부를 수 있게");

    let isRaining=false;
    const high="최고 기온";
    const low="최저 기온";
    const temperature="현재 기온";
    const sky="맑은지 구름 조금인지 어쩐지";
    const percent="50";
    const probability=isRaining?"":`오늘 강수확률 : ${percent}%`;

    //최종 전송 데이터
    let weather = {
        high: high,
        low: low,
        temperature: temperature,
        sky: sky,
        probability: probability //비가 오고 있을 때는 항목 삭제
    }

    return weather;
}

function Weather() {

    let result = handleWeather();
    console.log("***");

    return result;
};

export default getWeather;