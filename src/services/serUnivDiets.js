import axios from 'axios';

const fetchDietData = async (time, version) => {
    let url = 'http://app.ucan.or.kr/api/diet/hanyang/' + `${time}`
    
    const sMeal = await axios.get(url);
    return {'data': sMeal.data, 'version': version};
    
};

function dietDataBuilder(data ,version) {
    let res = {
        "version": version,
    }
    
    let new_obj = {data : data}
    Object.assign(res, new_obj);
    
    // name location diet.name diet.price
    
    return res
}

export {fetchDietData, dietDataBuilder};