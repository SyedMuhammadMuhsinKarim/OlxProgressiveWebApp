if ("email" in localStorage) {
    var logcheck = document.getElementById("logcheck");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // var displayName = user.username;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var providerData = user.providerData;
            var email = user.email;
            var uid = user.uid;
            //console.log("email: " + email + " uid: " + uid);

            var db = firebase.firestore();
            db.collection("users")
                .onSnapshot((snapshot) => {
                    snapshot.forEach((doc) => {
                        // console.log(`${doc.id} => ${doc.data()}`);
                        if (uid == doc.id) {
                            console.log("true");
                            logcheck.innerHTML = "<li><a href='./index.html'><span class='glyphicon glyphicon-user'></span><span id='greetUser'> Welcome " + doc.data().username + " </span></a></li><li><a href='notifications.html'><span class='glyphicon glyphicon-bell'></span><span> Notifications </span></a></li><li><a href='my-favorite.html'><span class='glyphicon glyphicon-heart'></span><span> Favorite </span></a></li><li><a onclick='logOut()' href=''><span class='glyphicon glyphicon-log-in'></span> Logout</a></li><li><a href='ads.html' class='btn btn-success' role='button'>Submit An AD</a></li>";
                        }
                    })
                })
        } else {
            // User is signed out
        }
    });

} else {
    var logcheck = document.getElementById("logcheck");
    logcheck.innerHTML = "<li><a href='index.html'><span class='glyphicon glyphicon-user'></span><span id='greetUser'> Welcome Guest </span></a></li><li><a href='SignIn.html'><span class='glyphicon glyphicon-log-in'></span> SignIn</a></li>";
}

// firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//         var email = user.email;
//         var uid = user.uid;

//         var db = firebase.firestore();
//         db.collection("users")
//             .onSnapshot((snapshot) => {
//                 snapshot.forEach((doc) => {
//                     // console.log(`${doc.id} => ${doc.data()}`);
//                     if (uid == doc.id) {
//                         // console.log("true");

//                     }
//                 })
//             })
//     } else {
//         // User is signed out
//     }
// });
