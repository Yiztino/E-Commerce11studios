// import {
//     getStorage,
//     ref as refStorage,
//     uploadBytesResumable,
//     getDownloadURL,
//   } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
//   export function firebaseStorage(app) {
//     const storage = getStorage(app),

//       docsRef = refStorage(storage, "docs"),
//       d = document,
//       $progressBar = d.getElementById("progress-bar"),
//       $progressAdvance = d.getElementById("progress-advance"),
//       $appStorage = d.getElementById("app-storage");
  

  
//     $appStorage.innerHTML = "";
  
//     d.addEventListener("change", (e) => {
//       if (e.target.matches("#uploader")) {
//         alert("Subiendo archivo(s)...");

//         let fileList = Array.from(e.target.files);
  
//         fileList.forEach((file) => {

//           const filesRef = refStorage(storage, "files/" + file.name),
//             uploadTask = uploadBytesResumable(filesRef, file);
  
//           uploadTask.on(
//             "state_changed",
//             (snapshot) => {

//               let progress = Math.floor(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//               );
//                 $progressBar.value = progress;
//               $progressAdvance.innerHTML = `${progress}%`;
//             },
//             (err) => {
//               $appStorage.innerHTML = `<p>Error al subir el archivo: ${err.code} - ${err.message}</p>`;
//             },
//             () => {
//               $progressBar.value = 0;
//               $progressAdvance.innerHTML = `0%`;
//               e.target.value = "";
  
//               getDownloadURL(uploadTask.snapshot.ref)
//                 .then((downloadURL) => {
//                   console.log(downloadURL);
//                   $appStorage.innerHTML += `
//                     <p>
//                       Puedes ver tu archivo en la siguiente:
//                       <a href="${downloadURL}" target="_blank">url</a>.
//                     </p>
//                   `;
//                 })
//                 .catch((err) => {
//                   $appStorage.innerHTML += `<p>Error al subir el archivo: ${err.code} - ${err.message}</p>`;
//                 });
//             }
//           );
//         });
//       }
//     });
//   }
  
