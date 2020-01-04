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

function dietTextBuilder(data, time) {
  let text = '';
  if (time==="lunch")
    text += '🍱오늘의 점심\n점심으로 에너지 충전!\n\n';
  else if(time ==='dinner')
    text += '🍲오늘의 저녁\n저녁저녁\n\n';
  else if (time==='breakfast')
    text += '🥞오늘의 아침\n맛있는 아침먹고 든든-한 오전 보내세요!\n\n'
  
  Object.keys(data).forEach((key) => {
    const item = data[key];

    text += `◼${item.name} \n`;
    text += `위치: ${item.location} \n`;
    let count = 0;
    text += '식단:\n';
    Object.keys(item.diet).forEach((dietKey) => {
      const menu = item.diet[count].name;
      const price = item.diet[count].price
      text += `\n▪ ${menu} ${price}`;
      count += 1;
    });
    text += '\n\n';

  });
  const percentage = Math.random()
  
  if (percentage < 0.01){
    text += '오늘의 메뉴 추천은 든든-하고 뜨끈-한 국밥입니다.';
    
  }else if (percentage > 0.99){
    text += '오늘 밤은 치킨이닭!';

  }else if (percentage > 0.98){
    text += 'WINNER WINNER CHICKEN DINNER!';

  }else if (percentage > 0.977){
    text += '엽기 떡볶이 먹고 싶다';

  }
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
  console.log(text);
  return res;
}

export default { fetchDietData, dietTextBuilder, dietDataBuilder };
