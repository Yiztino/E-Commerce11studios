const firebaseConfig = {
    apiKey: "AIzaSyCB1Pom5GEzwyOUHfeXtERlZ4RypZOpnMg",
    authDomain: "friendsnight2.firebaseapp.com",
    projectId: "friendsnight2",
    storageBucket: "friendsnight2.appspot.com",
    messagingSenderId: "862663551448",
    appId: "1:862663551448:web:4f0dfb9766d5ac216eaaad",
    measurementId: "G-1QVEKMSYL8"
};

firebase.initializeApp(firebaseConfig);

var fileText=document.querySelector(".fileText");
var uploadPercentage=document.querySelector(".uploadPercentage");
var progress=document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");

function getFile(e){
    fileItem= e.target.files[0];
    fileName= fileItem.name;
    fileText.innerHTML = fileName;
}

function uploadImage(){
    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot)=>{
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is", error);
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL",url);

            if(url != ""){
                img.setAttribute("src", url);
                img.style.display="block";
            }
        });
    })
}