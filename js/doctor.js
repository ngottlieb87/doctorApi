const apiKey = require('./../.env').apiKey;

export class Doctor{

  ailmentSearch(ailment){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=or-portland&skip=0&limit=100&user_key=${apiKey}`;
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
      parsedAil.data.forEach(function(ailment){
        $('#outputAilment').append(`<li><p>${ailment.profile.first_name} ${ailment.profile.last_name} ${ailment.profile.title}, ${ailment.specialties[0].actor}</p></li>`);
      });
      if(parsedAil.data.length < 1){
        $('#outputAilment').append('There was an error with your search. No results found (\/)_(;,,;)_(\/)');
      }
    },
    function(error){
      $('#outputAilment').append(`There was an error with your search. ${error.message}`);
    });
  }

  doctorSearch(name){
    let promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${name}&name=${name}&location=or-portland&skip=0&limit=100&user_key=${apiKey}`;
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
        if(`${doctor.practices[0].website}` == "undefined"){
          $('#outputDoctor').append(`<li><p>${doctor.profile.first_name}  ${doctor.profile.last_name} ${doctor.profile.title}</p></li>
          <p>Accpeting New Patients: ${doctor.practices[0].accepts_new_patients}</p>
          <p>Address: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</p>
          <p>Phone Number: ${doctor.practices[0].phones[0].number}</p>
          <p>Website: <em>No Website</em> </p>`);
        } else{
            $('#outputDoctor').append(`<li><p>${doctor.profile.first_name} ${doctor.profile.middle_name} ${doctor.profile.last_name} ${doctor.profile.title}</p></li>
            <p>Accpeting New Patients: ${doctor.practices[0].accepts_new_patients}</p>
            <p>Address: ${doctor.practices[0].visit_address.street} ${doctor.practices[0].visit_address.city}, ${doctor.practices[0].visit_address.state} ${doctor.practices[0].visit_address.zip}</p>
            <p>Phone Number: ${doctor.practices[0].phones[0].number}</p>
            <p>Website: <a href="${doctor.practices[0].website}">${doctor.practices[0].website}</a></p>`);
          }
        });
        if(parsedName.data.length < 1){
          $('#outputDoctor').append('There was an error with your search. No results found (\/)_(;,,;)_(\/)');
        }
      },
      function(error){
        $('#outputDoctor').append(`There was an error with your search. ${error.message}`);
    });
  }
}
