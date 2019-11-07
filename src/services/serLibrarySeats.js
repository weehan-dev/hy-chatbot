import axios from 'axios';
import configs from '../configs/index'
import { PassThrough } from 'stream';
const fetchSeatData = async (version) => {
  
  const libSeat = await axios.get(configs.URL.LIBRARY);
  return {'libseat':libSeat, 'version':version};
};


function seatDataBuilder(libSeat, version) {
    // name location diet.name diet.price
    let res = {
        "version": version,
        "data":{}
    }
    if (libSeat.success == true) {
        for (let i = 0; i < libSeat.data.totalCount; i++) {
            res["data"][`w${i}`] = libSeat.data.list[i]
        }
    }else {
        PassThrough
    }

    
    return res
}

export {fetchSeatData, seatDataBuilder};