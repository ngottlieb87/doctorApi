import { Doctor } from './../js/doctor.js';

$(document).ready(function(){

  $("#form").submit(function(event){
    event.preventDefault();
    $('#outputAilment').text('');
    let ailment = $('#ailment').val();
    // let doctor = $('#doctor').val();
    let doctor = new Doctor;
    $('#displayAilment').fadeIn(800)
    $('#displayName').hide();
    doctor.ailmentSearch(ailment);

  });

  $('#formDoctor').submit(function(event){
    event.preventDefault();
    $('#ouputDoctor').text('');
    let name = $('#doctorName').val();
    let doctorName = new Doctor;

    doctorName.doctorSearch(name);

    $('#displayName').slideDown();
    $('#displayAilment').hide();

  });
});
