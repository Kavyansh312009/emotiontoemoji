prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image"src="'+data_uri+'"/>';

    })
}

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/j0UPeMlZx/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model LOADED!');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data_1 = "The First Prediction is"+prediction_1;
    speak_data_2 = "the Second Prediction is"+prediction_2;
    var utterThis  = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById("captured_image");
    Classifier.classify(img, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1= results[0].label;
        prediction_2= results[1].label;
        
        speak()
        if(prediction_1== "Happy"){
            document.getElementById("update_emoji").innerHTML ="&#128512;";
            document.getElementById("msg").innerHTML = "Hope You Spread Your Happiness!";
            document.getElementById("msg").style.backgroundColor ="Green";
        }if(prediction_1== "Sad"){
            document.getElementById("update_emoji").innerHTML ="&#128532;";
            document.getElementById("msg").innerHTML ="Failure Makes the Life Perfect";
            document.getElementById("msg").style.backgroundColor ="Orange";
        }if(prediction_1== "Angry"){
            document.getElementById("update_emoji").innerHTML ="&#128545;";
            document.getElementById("msg").innerHTML ="Drink Some Water you will be FINE";
            document.getElementById("msg").style.backgroundColor ="Red"; 
        }
        if(prediction_2== "Happy"){
            document.getElementById("update_emoji2").innerHTML ="&#128512;";
        }if(prediction_2== "Sad"){
            document.getElementById("update_emoji2").innerHTML ="&#128532;";
        }if(prediction_2== "Angry"){
            document.getElementById("update_emoji2").innerHTML ="&#128545;"; 
        }
         
    }
}

















