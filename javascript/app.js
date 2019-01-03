// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var auth = firebase.auth();
var storageRef = firebase.storage().ref();

function signUp() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;

    document.getElementById("msg").innerHTML = '';
    document.getElementById("errmsg").innerHTML = '';
    console.log(email, pwd);

    firebase.auth().createUserWithEmailAndPassword(email, pwd)
        .then(function (res) {

            // console.log('res =>', res.user.uid);
            document.getElementById("msg").innerHTML = 'Registered Successfully!';

            db.collection('users').doc(res.user.uid).set({ username, email })
                .then(() => {
                    // console.log('Added in db');
                    window.location.href = "SignIn.html";
                })
                .catch((e) => {
                    // console.log('error Adding in db');
                })
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            //console.log(errorMessage);
            document.getElementById("errmsg").innerHTML = errorMessage;
        });
}

function signIn() {
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;

    document.getElementById("errmsg").innerHTML = '';

    firebase.auth().signInWithEmailAndPassword(email, pwd)
        .then((res) => {
            //console.log(res);
            localStorage.setItem("email", email);
            window.location.href = "index.html";
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(errorMessage);
            document.getElementById("errmsg").innerHTML = errorMessage;
        });
}

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        localStorage.clear();
        // console.log("Sign-out successful");
        // window.location.href = "SignIn.html";
    }).catch(function (error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // console.log(errorMessage);
    });
}

function logSession() {
    if ("email" in localStorage) {
        // ...
    } else {
        // ...
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;
        var currUser = firebase.auth().currentUser.username;

        console.log("email: " + email + " uid: " + uid + " user " + currUser);
    } else {
        // User is signed out.
        // ...
    }
});

// firebase.firestore().enablePersistence()
//     .then(function () {
//         // Initialize Cloud Firestore through firebase
//         db = firebase.firestore();
//         console.log("offline");
//     })
//     .catch(function (err) {
//         if (err.code == 'failed-precondition') {
//             // Multiple tabs open, persistence can only be enabled
//             // in one tab at a a time.
//             // ...
//             console.log("offline Error");
//         } else if (err.code == 'unimplemented') {
//             // The current browser does not support all of the
//             // features required to enable persistence
//             // ...
//             console.log("offline Err");
//         }
//     });

