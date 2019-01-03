var db = firebase.firestore();
var auth = firebase.auth();
var currentUser;
var ad;
var reciever;
var sender;
var time;
var notifications = document.getElementById("notifies");
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('function called');
        currentUser = auth.currentUser.uid;
        console.log("Current => ", currentUser);
        db.collection("room")
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    if (doc.data().reciever == currentUser) {
                        console.log(doc.id, 'ID');
                        console.log(`${doc.id} => ${doc.data()}`);
                        console.log(doc.data().reciever);

                        adId = doc.data().ad;
                        reciever = doc.data().reciever; //== currentUser
                        sender = doc.data().user;
                        // time = doc.data().timestamp;
                        localStorage.setItem("ADID", adId);
                        localStorage.setItem("RECIEVER", reciever);
                        localStorage.setItem("SENDER", sender);
                        console.log(" Ad " + adId + " Reciever " + reciever + " sender " + sender + " time " + time);

                        var div = document.createElement("div");
                        div.setAttribute("onclick", "getResponseMessage()");
                        div.setAttribute("class", "container bar");

                        // var span1;
                        // db.collection("users").doc(sender)
                        //     .onSnapshot((snapshot) => {
                        //         snapshot.forEach((doc) => {
                        console.log("notify");
                        span1 = document.createElement("span");
                        span1.setAttribute("class", "head5");
                        span1.innerHTML = "Message: " + doc.data().username;
                        div.appendChild(span1);
                        //     })
                        // })

                        var br = document.createElement("br");
                        div.appendChild(br);


                        var span2 = document.createElement("span");
                        // span2.setAttribute("class", "head5");
                        span2.innerHTML = "You Have A New Notification";
                        div.appendChild(span2);

                        // console.log(doc.data().timestamp, "time")
                        // var span3 = document.createElement("span");
                        // span3.setAttribute("class", "float-right");
                        // span3.innerHTML = doc.data().timestamp;
                        // div.appendChild(span3);

                        notifications.appendChild(div);
                    }
                })
            })
    }
});

function getResponseMessage() {
    window.location.href = "chat.html";
}
