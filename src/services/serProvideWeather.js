// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import axios from 'axios';


function handleDate(){
    let today= new Date();
    let year= today.getFullYear();
    let month=today.getMonth()+1;
    let day=today.getDate();

    let date=`${year}${month}${day}`
    return date;
};

function handleTime(){
    let today= new Date();

    let hours=today.getHours();
    let minutes=today.getMinutes();

    if (minutes<45){
        hours--;
    };

    return hours;
}

function handleSpaceTime(){
    let today= new Date();

    let hours=today.getHours();
}

async function getWeather() {
    console.log("기상청api로 정보를 받아옴");


    const servicekey = process.env.serviceKey;
    let basedate = handleDate();
    let basetime = `${handleTime()}00`;
    let spacetime = "2300";

    //초단기 실황
    let url1 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
    //초단기 예보
    let url2 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
    //동네 예보
    let url3 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${spacetime}&nx=61&ny=127&pageNo=3&numOfRows=10&_type=json`;

    console.log(url1);

    let weatherData={};

    await axios.get(url1).then(response => {
        // weatherData=response.data.response
        weatherData = response.data.response.body.items;
    });
    
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

async function Weather() {

    let result = await getWeather();
    console.log("result");

    return result;
};

export default Weather;