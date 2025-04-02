
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBtt0AgKWCw8qYKxmGRjAVFz2xE48UcyXA",
    authDomain: "login-and-signup-form-d1006.firebaseapp.com",
    projectId: "login-and-signup-form-d1006",
    storageBucket: "login-and-signup-form-d1006.firebasestorage.app",
    messagingSenderId: "339221822669",
    appId: "1:339221822669:web:d7d8a8356d5b3357457d84"
  
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000)
  }

  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event) =>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstname=document.getElementById('fName').value;
    const lastname=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=> {
        const user=userCredentials.user;
        const userData={
            email: email,
            firstname: firstname,
            lastname: lastname
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData) 
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/emial-already-in-use'){
            showMessage('Email Address Already Exists!!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }

    })

  })
  
  const signIn=document.getElementById('submitSignIn');
  signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=document.getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='homepage.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage' )
        }
    })
  })
