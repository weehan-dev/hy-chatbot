import axios from 'axios';

const getResponse = async (version) => {
  let url = 'https://lib.hanyang.ac.kr/smufu-api/pc/1/rooms-at-seat';
  
  const libSeat = await axios.get(url);
  return [libSeat, version];
};

export default getResponse;