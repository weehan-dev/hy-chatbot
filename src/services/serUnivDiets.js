import axios from 'axios';
import configs from '../configs/index';

const fetchDietData = async (time) => {
  let diet = {};
  try {
    diet = await axios.get(`${configs.URL.DIET}${time}`);
  } catch (e) {
    // 오전 2시 즘 학식 API 접속시 오류
    diet.data = '정보를 불러오는데 실패했습니다.';
  }

  return diet.data;
};

function dietTextBuilder(data) {
  let text = '';

  Object.keys(data).forEach((key) => {
    const item = data[key];
    text += `${item.name} \n`;
    text += `위치: ${item.location} \n`;
    let count = 0;
    text += '식단:\n';
    Object.keys(item.diet).forEach((dietKey) => {
      text += `\n ${item.diet[count].name + item.diet[count].price} \n`;
      count += 1;
    });
    text += '\n\n';
  });
  return text;
}

function dietDataBuilder(text, version) {
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


  // name location diet.name diet.price

  return res;
}

export default { fetchDietData, dietTextBuilder, dietDataBuilder };
