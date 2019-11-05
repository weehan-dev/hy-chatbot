import axios from 'axios';

const fetchSeatData = async (version) => {
  let url = 'https://lib.hanyang.ac.kr/smufu-api/pc/1/rooms-at-seat';
  
  const libSeat = await axios.get(url);
  return {'libseat':libSeat, 'version':version};
};


function seatDataBuilder(data, version) {
    // name location diet.name diet.price
    let res = {
        "version": version,
    }
    
    for(let i=0; i<data.data.data.totalCount; i++)
    {   
        res[`w${i}`] = data.data.data.list[i]
        
    }
    console.log(res);

    
    
    return res
}

export {fetchSeatData, seatDataBuilder};