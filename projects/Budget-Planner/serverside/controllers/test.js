import axios from "axios";


export const fetchsymbls = (stock,iexApiToken) => 
axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${stock}&filter=latestPrice&types=quote&token=${iexApiToken}`)


// if (user.data==="Unknown symbol")
// {}
let symbol="boi.s;s"
let p=4;
if (!(await(fetchsymbls(symbol,"pk_6fa1ccc6513640abb6257fc93550e73b")))){
  console.log(678);
  p=-1
}
await console.log(p)