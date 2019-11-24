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



export {spaceDate, spaceTime};