import axios from 'axios';
import configs from '../configs/index';

const fetchSeatData = async () => {
  const libSeat = await axios.get(configs.URL.LIBRARY);

  return libSeat.data;
};

function seatTextBuilder(libseat) {
  let text = '';
  if (!libseat.success && !libseat.data && !libseat.data.list) return text;

  libseat.data.list.map(item => {
    if (item.isActive) {
      text += `${item.name} \n [ ${item.available} / ${item.activeTotal} ]\n 잔여좌석: ${item.available} \n\n`;
    }

    return text;
  });

  return text;
}

function seatDataBuilder(text, version) {
  // name location diet.name diet.price
  const res = {
    version,
    template: {
      outputs: [
        {
          simpleText: {
            text
          }
        }
      ]
    }
  };

  return res;
}

export default { fetchSeatData, seatTextBuilder, seatDataBuilder };
