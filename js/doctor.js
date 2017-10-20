const apiKey = require('./../.env').apiKey;

export class Doctor{

  apiCall(ailment){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=broken%20bone&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`;
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response);
        } else{
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response){

      let parsed = JSON.parse(response);

      parsed.data.forEach(function(ailment){
        $("#ouput").append(`<li><p>${ailment.first_name}</p></li>`)
      });
    })
  }

}
