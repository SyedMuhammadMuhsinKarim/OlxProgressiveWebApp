var db = firebase.firestore();
var auth = firebase.auth();
var storageRef = firebase.storage().ref();

var productTitle;
var productDiscription;
var year;
var model;
var file;
var url;
var categories;
var fileUrl;
var price;

window.onload = function() {
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById("subbtn").disabled = true;
}

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var metadata = {
        'contentType': file.type
    };
    // Push to child path.
    // [START oncomplete]
    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded : ', snapshot.totalBytes, 'bytes.');
        // console.log('File metadata: :', snapshot.metadata);
        // Let's get a download URL for the file.
        snapshot.ref.getDownloadURL().then(function(url) {
            console.log('File available at', url);
            fileUrl = url;
            document.getElementById("subbtn").disabled = false;
        });
    }).catch(function(error) {
        // console.error('Upload failed:', error);
    });
    // [END oncomplete]
}

function SubmitAd() {
    productTitle = document.getElementById("productTitle").value;
    productDiscription = document.getElementById("productDiscription").value;
    categories = document.getElementById("category").value;
    year = document.getElementById("year").value;
    model = document.getElementById("model").value;
    price = document.getElementById("price").value;
    document.getElementById("message-failure").innerText = "";
    document.getElementById("message").innerText = "";
    //document.getElementById('file').addEventListener('change', handleFileSelect, false);
    if (fileUrl !== undefined && productTitle !== "") {
        db.collection('ads').add({
                title: productTitle,
                Description: productDiscription,
                year: year,
                category: categories,
                price: price,
                model: model,
                image: fileUrl,
                uid: auth.currentUser.uid
            }).then(() => {
                // console.log('Added in db', docRef.id);
                // Sucessfully Added
                document.getElementById("message").innerText = "Your Ad has been sucessfully submitted";
                window.location.reload;
            })
            .catch((e) => {
                // console.log('error Adding in db', error);
                //Error
                document.getElementById("message-failure").innerText = "Your Ad not submit";
            })
    } else {
        document.getElementById("message-failure").innerText = "Your Ad not submit Please re-select picture";
    }

}