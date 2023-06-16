const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibWloaXJwYWwiLCJhIjoiY2xpdms0NjFsMDdkODNlcmxjb3RreGk4OCJ9.I0QA1f_B9G0yNcRMXiP1mQ&limit=1'

    request({url:url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length===0)
        {
            callback('Unable to find location. Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports=geocode