var status = "";
var object = "";
var objects = [];


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

    image(video,0,0,600,400);

    if(status != ""){
        
        object_detection.detect(video,gotResult);

        for(i = 0; i > objects.length; i++){
            
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " %" , objects[i].x + 20 , objects[i].y + 20);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
            if(object == objects[i].label){
                video.stop();
                object_detection = detect(gotResult);
                document.getElementById("status").innerHTML = object + " found";
                var synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = object + " not found";
                var synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("sorry " + object + " not found");
                synth.speak(utterThis);
            }
        }
        
       

    }

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

function gotResult(result,error){
    if(result){
        console.log(result);
        objects = result;
    }
    console.log(error);
}