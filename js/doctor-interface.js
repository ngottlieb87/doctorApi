import { Doctor } from './../js/doctor.js';

$(document).ready(function(){
  $("#form").submit(function(){
    event.preventDefault();
    $('#ouput').text('');
    let ailment = $('#ailment').val();
    let doctor = new Doctor;
    doctor.apiCall(ailment);
  });
});
