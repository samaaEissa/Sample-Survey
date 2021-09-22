'use strict';

var singleUploadForm = document.querySelector('#singleUploadForm');
var singleFileUploadInput = document.querySelector('#singleFileUploadInput');
var singleFileUploadError = document.querySelector('#singleFileUploadError');
var singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess');

var multipleUploadForm = document.querySelector('#multipleUploadForm');
var multipleFileUploadInput = document.querySelector('#multipleFileUploadInput');
var multipleFileUploadError = document.querySelector('#multipleFileUploadError');
var multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess');

function uploadSingleFile(file) {
    var formData = new FormData();
    formData.append("file", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/admin/upload/singlefile");
    xhr.onload = function() {        
        var response = JSON.parse(xhr.responseText);
        if(xhr.status == 200) {
        	  alert("File Uploaded Successfully")

        } else {
        	  alert("Some Error Occurred")

        }
    }

    xhr.send(formData);
}

function uploadMultipleFiles(files) {
    var formData = new FormData();
    for(var index = 0; index < files.length; index++) {
        formData.append("files", files[index]);
    }
    var vendor = $("#vendor").val();
    var filesType = $("#filesType").val();  
    formData.append('options', new Blob([JSON.stringify({
        "vendor":vendor ,
        "filesType": filesType                    
    })], {
        type: "application/json"
    }));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/admin/upload/multiplefiles");
    xhr.onload = function() {
    	if(xhr.status == 200) {
        	alert("File Uploaded Successfully")
        } else {
        	alert("Some Error Occurred")
        }
    }
    xhr.send(formData);
}

/*singleUploadForm.addEventListener('submit', function(event){
    var files = singleFileUploadInput.files;
    if(files.length === 0) {
        singleFileUploadError.innerHTML = "Please select a file";
        singleFileUploadError.style.display = "block";
    }
    uploadSingleFile(files[0]);
    event.preventDefault();
}, true);*/


multipleUploadForm.addEventListener('submit', function(event){
    var files = multipleFileUploadInput.files;
    if(files.length === 0) {
        multipleFileUploadError.innerHTML = "Please select at least one file";
        multipleFileUploadError.style.display = "block";
    }
    uploadMultipleFiles(files);
    event.preventDefault();
}, true);

