var status = "";
var object = "";

function preload(){

}

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    video.size(600,400);
}

function draw(){

    image(video,0,0,600,400)

}

function start(){
    object_detection = objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    object = document.getElementById("input").value;

}

function model_loaded(){
    console.log("model has been loaded");
    status = true;
}