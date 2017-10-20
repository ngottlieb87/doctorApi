const apiKey = require('./../.env').apiKey;

export class Doctor{

  apiCall(ailment){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`;
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
      let parsedAil = JSON.parse(response);
      // debugger;
      parsedAil.data.forEach(function(ailment){
        $('#output').append(`<li><p>${ailment.profile.first_name} ${ailment.profile.last_name}</p></li>`);
          // debugger;
      });
    },
    function(error){
      $('#output').text(`There was an error with your search. Please try again.`);
    });
  }
}
