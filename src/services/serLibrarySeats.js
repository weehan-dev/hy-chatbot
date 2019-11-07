import axios from 'axios';
import configs from '../configs/index'
import { PassThrough } from 'stream';
import { text } from 'body-parser';
const fetchSeatData = async () => {
  
  const libSeat = await axios.get(configs.URL.LIBRARY);

  return libSeat.data;
};

function seatTextBuilder(libseat){
    let text = "";

    if (libseat.success === true) {
        for (var i = 0, item; item = libseat.data.list[i]; i++) {
            if (item.isActive === true) {
                text += `${item.name} \n [ ${item.available} / ${item.activeTotal} ]\n 잔여좌석: ${item.available} \n\n`;
            }

        }
    

    }else{

    }

    return text;
}


function seatDataBuilder(text, version) {
    // name location diet.name diet.price
    let res = {
        "version": version,
        "template": {
            "outputs": [
                {
                    "simpleText": {
                        "text": text
                    }
                }
            ]
        }
    }


    return res
}

export {fetchSeatData, seatTextBuilder, seatDataBuilder};