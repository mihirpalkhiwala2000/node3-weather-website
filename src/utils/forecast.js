const request=require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=281d818661c3270aed36d0f7b2bf5fd0&units=m&query='+latitude +','+longitude
    
    
    request({url: url,json:true},(error,{body})=>{
        
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find locationnn',undefined)
        }else{
            
            const res=body.current
            callback(undefined,res.weather_descriptions[0]+", It is currently "+ res.temperature+" degrees out. There is a chance of "+ res.precip+"% chance of rain.")

        }
    })
}


module.exports=forecast