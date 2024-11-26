
import { app } from "./modules/firebase/config-app.js";
//import { firebaseCRUD } from "./modules/crud.js";
import { authEmail } from "./modules/firebase/auth-email.js";
//import { authGitHub } from "./modules/firebase/auth-github.js";
//import { authGoogle } from "./modules/firebase/auth-google.js";
//import { firebaseStorage } from "./modules/firebase/storage.js";

console.log(app);
//firebaseCRUD(app);
authEmail(app);
//authGitHub(app);
//authGoogle(app);
//firebaseStorage(app);

