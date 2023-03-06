const axios = require('axios').default;

const getItemValue = async(url)=>{
    const outcome = axios.get(url);
    const data = (await outcome).data;
    console.log(data);

}

getItemValue('https://anlogvinenko-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/isbn/2')
    .catch(err=>console.log(err.toString()));

