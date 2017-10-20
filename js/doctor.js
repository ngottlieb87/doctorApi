const apiKey = require('./../.env').apiKey;

export class Doctor{

  ailmentSearch(ailment){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=or-portland&skip=0&limit=50&user_key=${apiKey}`;
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
        $('#outputAilment').append(`<li><p>${ailment.profile.first_name} ${ailment.profile.last_name} ${ailment.profile.title}, ${ailment.specialties[0].actor}</p></li>`);
          // debugger;
      });
    },
    function(error){
      $('#outputAilment').text(`There was an error with your search. Please try again.`);
    });
  }

  doctorSearch(name){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${name}&location=or-portland&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${apiKey}`;
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
      let parsedName = JSON.parse(response);
      parsedName.data.forEach(function(doctor){
        $('#outputDoctor').append(`<li><p>${doctor.profile.first_name} ${doctor.profile.middle_name} ${doctor.profile.last_name} ${doctor.profile.title}</p></li>
      <p>Accpeting New patients: ${doctor.practices[0].accepts_new_patients}</p>
      <p>Address: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</p>
      <p>Phone Number: ${doctor.practices[0].phones[0].number}</p>
      <p>Website: ${doctor.practices[0].website}</p>`);
      });
    },
    function(error){
      $('#outputDoctor').text(`There was an error with your search. Please try again.`);
    });
  }

}
