import { Doctor } from './../js/doctor.js';

$(document).ready(function(){
  $("#form").submit(function(){
    event.preventDefault();
    $('#output').text('');
    let ailment = $('#ailment').val();
    let doctor = new Doctor;
    let searchAilment = doctor.apiCall(ailment);
  });
});
