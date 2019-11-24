// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달
import axios from 'axios';


//기상청 api에 넣을 날짜 파라미터 반환 함수
function handleDate() {
    let today = new Date();

    let minutes = today.getMinutes();

    if (minutes < 45) {
        today.setHours(today.getHours() - 1);
    };

    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let date = `${year}${month}${day}`;
    return date;
}


//기상청 api에 넣을 시간 파라미터 반환 함수
function handleTime() {
    let today = new Date();
    let minutes = today.getMinutes();

    if (minutes < 45) {
        today.setHours(today.getHours() - 1);
    };

    let hours = ("0" + today.getHours()).slice(-2);

    return hours;
}


function spaceDate() {
    let today = new Date();

    if(today.getHours()<3){
        today.setDate(today.getDate()-1);
    }

    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);

    let date = `${year}${month}${day}`;
    return date;
}


function spaceTime() {
    let today = new Date();
    let hours="0200"

    if(today.getHours()<3){
        hours="2300";
    }

    return hours;   
}


//날짜와 시간을 받아 기상청api로 기상 정보 받아오는 부분
async function getWeather() {
    const servicekey = process.env.serviceKey;
    let basedate = handleDate();
    console.log("basedate", basedate);
    let basetime = `${handleTime()}00`;
    console.log("basetime", basetime);

    let spacedate = spaceDate();
    console.log("spacedate",spacedate);
    let spacetime = spaceTime();
    console.log("spacetime",spacetime);

    //초단기 실황
    let url1 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastGrib?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=10&_type=json`;
    //초단기 예보
    let url2 = `http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastTimeData?ServiceKey=${servicekey}&base_date=${basedate}&base_time=${basetime}&nx=61&ny=127&pageNo=1&numOfRows=25&_type=json`;
    //동네 예보
    let url3=`http://newsky2.kma.go.kr/service/SecndSrtpdFrcstInfoService2/ForecastSpaceData?ServiceKey=${servicekey}&base_date=${spacedate}&base_time=${spacetime}&nx=61&ny=127&pageNo=1&numOfRows=175&_type=json`;

    let liveWeather = {};
    let forecastWeather = {};
    let spaceWeather = {};
    let rows=0;

    await axios.get(url1).then(response => {
        liveWeather = response.data.response.body.items.item;
    });

    await axios.get(url2).then(response => {
        forecastWeather = response.data.response.body.items.item;
    });

    await axios.get(url3).then(response => {
        spaceWeather = response.data.response.body.items.item;
        rows=response.data.response.body.totalCount;
    });

    let weatherData = {
        liveWeather: liveWeather,
        forecastWeather: forecastWeather,
        spaceWeather: spaceWeather,
        rows:rows
    }
    return weatherData;
}


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

    return weather;
}


async function Weather() {

    let result = await handleWeather();
    console.log("result");

    return result;
};


export default Weather;