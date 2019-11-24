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

export default handleTime;