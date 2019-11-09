// 챗봇-'오늘의 왕십리 날씨'를 담당하는 부분
// 사용자가 날씨를 요구하면 기상청 api -> 데이터 가공 -> 라우터로 json 전달


function getWeather(){
    console.log("기상청api로 정보를 받아옴");
}


function handleWeather(){
    console.log("받아온 정보를 하나의 데이터로 정리. 라우터에서 바로 부를 수 있게");

    let weather={
        high:'최고 기온',
        low: '최저 기온',
        temperature: '현재 기온',
        sky: '맑은지 구름 조금인지 어쩐지',
        probability: '강수 확률' //비가 오고 있을 때는 항목 삭제
    }

    return weather;
}

export default handleWeather;