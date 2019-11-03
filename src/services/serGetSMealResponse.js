import axios from 'axios';

const getResponse = async (time, version) => {
  let url = 'http://app.ucan.or.kr/api/diet/hanyang/' + `${time}`
  
  const sMeal = await axios.get(url);
  return [sMeal.data, version];
};

export default getResponse;