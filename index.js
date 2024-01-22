const express = require('express')
const axios=require('axios')
const path=require('path')
const app = express()
const port = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
const price=async(fromStation, toStation, date)=>{
  var confiq={
    method:'GET',
    url:`https://indian-railway-api.cyclic.app/trains/gettrainon?from=${fromStation}&to=${toStation}&date=${date}`
  }
  let ms;
  return await axios.request(confiq).then((res)=>{
    ms=res.data;
    //console.log(ms);
    return ms;
}).catch((error)=>{
  ms="DAta error"
  return ms; 
})
}
app.get("/", (req, res) => {
  res.send("okay")
})
app.get('/station-details',async (req, res) => {
  console.log('api spanked')
  const [ from, tempTo, tempDate ] = req.query.fromStation.replaceAll(`'`,'').split('?');
  const to = tempTo.split('=')[1]
  const date = tempDate.split('=')[1];
  console.log({from},{to},{date})
  
  // res.json({check:1234})
 //let k= await res.json(`${price()}`)
 await price(from,to,date).then(data=>{
   console.log(data);
   res.json(data);
 }).catch( err =>{ throw Error( `Some Error in fetching data from IRCTC: ${err} `) })
//  await res.json(`${k}`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})