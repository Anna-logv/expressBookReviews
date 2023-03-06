const axios = require('axios').default;
const url="https://anlogvinenko-5000.theiadocker-2-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/The Divine Comedy";
const req = axios.get(url);
req.then(resp => {
    console.log(resp.data);
})
.catch(err => {
    console.log(err.toString())
});

