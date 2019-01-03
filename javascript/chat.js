// var db = firebase.firestore();
var adId;
var senderId;
var recieverId;
var chat = document.getElementById("your-chat");
function chatNow(thisRef) {
    // document.getElementById("modalMessage").innerHTML = "";
    console.log("recentAdId => ", thisRef.id); //Get Current Post ID
    console.log("senderId =>", auth.currentUser.uid); //Get Current User ID
    db.collection("ads")
        .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                if (thisRef.id == doc.id) {
                    if (auth.currentUser.uid == doc.data().uid) {
                        console.log("you cannot chat your Self")
                        alert("You can't Contact yourself");
                    } else {
                        console.log("reciverid =>", doc.data().uid);
                        // set to local storage
                        localStorage.setItem("selectedAdId", thisRef.id);
                        localStorage.setItem("sender", auth.currentUser.uid);
                        localStorage.setItem("reciever", doc.data().uid);
                        // getChatDetail();
                        window.location.href = "chat.html";
                    }
                }
            })
        })
}
function loadChat() {
    if ('selectedAdId' && 'sender' && 'reciever' in localStorage) {
        console.log("I AM SENDER");
        getChatDetail();
    } else if ('ADID' && 'RECIEVER' && 'SENDER' in localStorage) {
        console.log("I AM REcIEVER");
        getChatDetail();
    }
}

//onload chat.html
function getChatDetail() {
    if ('selectedAdId' && 'sender' && 'reciever' in localStorage) {
        console.log("Data are in LocalStorage");
        adId = localStorage.getItem("selectedAdId"); //adId
        senderId = localStorage.getItem("sender"); //currentUser 
        recieverId = localStorage.getItem("reciever"); // who recieve
        getMessage();
    }
    // Reciever
    else if ('ADID' && 'RECIEVER' && 'SENDER' in localStorage) {
        console.log("Data are in LocalStorage RECIEVER");
        adId = localStorage.getItem("ADID"); // AdID
        recieverId = localStorage.getItem("RECIEVER"); // currentUser
        senderId = localStorage.getItem("SENDER"); // who send message
        getMessage();
    } else {
        console.log("Something is Wrong");
    }
}

function chatData() {
    //sent data on DB
    console.log('chat data', chat)
    chat.innerHTML = '';
    var text = document.getElementById("chat").value;
    console.log(senderId, recieverId, adId)

    if (recieverId == auth.currentUser.uid) {
        db.collection("room").doc(senderId).set({
            user: recieverId,
            reciever: senderId,
            ad: adId
        }).then(() => {
            console.log("Added Chat Info");
        }).catch(() => {
            console.log("Error in Chat Info");
        })

        db.collection("chat").doc(adId).collection("messages").add({
            message: text,
            sender: recieverId,
            reciever: senderId,
            timestamp: Date.now(),
        }).then(() => {
            console.log("Added Chat Info");
        }).catch(() => {
            console.log("Error in Chat Info");
        })
    }

    if (senderId == auth.currentUser.uid) {
        db.collection("room").doc(senderId).set({
            user: senderId,
            reciever: recieverId,
            ad: adId
        }).then(() => {
            console.log("Added Chat Info 1");
        }).catch(() => {
            console.log("Error in Chat Info 1");
        })

        db.collection("chat").doc(adId).collection("messages").add({
            message: text,
            sender: senderId, // buyer => user
            reciever: recieverId, // advertiser => getFromAd
            timestamp: Date.now(),
        }).then(() => {
            console.log("Added Chat Info");
        }).catch(() => {
            console.log("Error in Chat Info");
        })
    }
    // send Notification to advertiser => create chat button for each user in notification panel
}

function getMessage() {
    console.log('function called')
    // chat.innerHTML = '';
    db.collection("chat").doc(adId).collection("messages").orderBy("timestamp")
        .onSnapshot((snapshot) => {
            chat.innerHTML = '';
            snapshot.forEach((doc) => {
                // console.log(doc.data(), 'repeatrepeatrepeatrepeat');
                //SenderId === Current Login User
                // console.log(doc.data(), '/////////////////////')
                // if ((doc.data().sender === firebase.auth().currentUser.uid && doc.data().receiver === recieverId) ||
                //     (doc.data().receiver === firebase.auth().currentUser.uid && doc.data().sender === senderId)) {
                // }
                // if (doc.data().reciever === recieverId && doc.data().sender === senderId) {

                // }

                if (doc.data().reciever !== auth.currentUser.uid) {
                    console.log("I Am SENDER1")
                    var div = document.createElement("div");
                    div.setAttribute("class", "container-fluid float-right");
                    var para = document.createElement('p');
                    para.setAttribute("class", "style-right");
                    para.innerHTML = doc.data().message;
                    div.appendChild(para);
                    chat.appendChild(div);

                    if (doc.data().sender !== auth.currentUser.uid) {
                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "container-fluid float-left");
                        var para1 = document.createElement('p');
                        para1.setAttribute("class", "style-left")
                        para1.innerHTML = doc.data().message;
                        div1.appendChild(para1);
                        chat.appendChild(div1);
                    }
                }

                else if (doc.data().sender !== auth.currentUser.uid) {
                    console.log("I Am RECIEVER1")
                    var div = document.createElement("div");
                    div.setAttribute("class", "container-fluid float-left");
                    var para = document.createElement('p');
                    para.setAttribute("class", "style-left");
                    para.innerHTML = doc.data().message;
                    div.appendChild(para);
                    chat.appendChild(div);

                    if (doc.data().reciever !== auth.currentUser.uid) {
                        var div1 = document.createElement("div");
                        div1.setAttribute("class", "container-fluid float-right");
                        var para1 = document.createElement('p');
                        para1.setAttribute("class", "style-right")
                        para1.innerHTML = doc.data().message;
                        div1.appendChild(para1);
                        chat.appendChild(div1);
                    }
                }
            })
        })

}
