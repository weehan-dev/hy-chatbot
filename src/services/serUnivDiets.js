import axios from 'axios';
import configs from "../configs/index";
import { PassThrough } from 'stream';
import { text } from 'body-parser';

const fetchDietData = async (time) => {
    let diet = {};
    try{
        diet = await axios.get(configs.URL.DIET + `${time}`);
    } catch(e){
        diet.data = "정보를 불러오는데 실패했습니다."
    }
    
    return diet.data;
    
};

function dietTextBuilder(data){

    let text = data;


    return text
}

function dietDataBuilder(text ,version) {
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


    // name location diet.name diet.price
    
    return res
}

export {fetchDietData, dietTextBuilder, dietDataBuilder};