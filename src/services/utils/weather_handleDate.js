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

export default handleDate;