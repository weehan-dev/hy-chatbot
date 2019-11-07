import axios from 'axios';
import configs from "../configs/index";

const fetchDietData = async (time, version) => {
    
    const diet = await axios.get(configs.URL.DIET + `${time}`);
    console.log(111, diet);
    return {'data': diet.data, 'version': version};
    
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