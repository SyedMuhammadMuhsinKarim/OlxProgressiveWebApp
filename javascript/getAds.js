var db = firebase.firestore();
var auth = firebase.auth();
var posts = document.getElementById("post");
posts.innerHTML = "";
var div, divInner1, divInner2, img1, h3, p, btn, modaldiv, modaldivInner01, modaldivInner02, modaldivInner03a, modaldivInner03aButton, modaldivInner03ah4, modaldivInner03b, modaldivInner03bImg, modaldivInner03c, modaldivInner03cButton;
var modaldivInner03bChat, id, clas;
var btnFav;

// document.getElementsByTagName('body').addEventListener('load', getAllAds, false);

window.onload = getAllAds();
function getAllAds() {
    db.collection("ads")
        .onSnapshot((snapshot) => {
            posts.innerHTML = "";
            snapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                console.log(doc.data().category);

                div = document.createElement("div");
                div.setAttribute("class", "seprate col-sm-6 col-xs-12 col-md-4 col-lg-3 center-block");

                //DIV INNER 01 Starts
                divInner1 = document.createElement("div");
                img1 = document.createElement("img");

                divInner1.setAttribute("class", "image");
                img1.setAttribute("class", "img-responsive");
                img1.setAttribute("width", "100%");
                img1.setAttribute("src", doc.data().image);
                img1.setAttribute("alt", doc.data().title);

                divInner1.appendChild(img1);
                //End DIV Inner 01

                //DIV Inner 02 Starts (Posts Ads)
                divInner2 = document.createElement("div");
                h3 = document.createElement("h3");
                //p = document.createElement("p");
                btn = document.createElement("a");
                // btnFav = document.createElement("a");

                divInner2.setAttribute("class", "content");
                btn.setAttribute("type", "button");
                btn.setAttribute("class", "btn btn-primary");
                btn.setAttribute("data-toggle", "modal");
                btn.setAttribute("data-target", "#" + doc.id);

                // btnFav.setAttribute("type", "button");
                // btnFav.setAttribute("class", "btn btn-danger");
                // btnFav.setAttribute("onclick", "");

                h3.innerHTML = doc.data().title;
                btn.innerHTML = "Read More >>>";
                // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";

                divInner2.appendChild(h3);
                divInner2.appendChild(btn);
                // divInner2.appendChild(btnFav);

                // btnFav = document.createElement("a");
                // btnFav.setAttribute("type", "button");
                // btnFav.setAttribute("class", "btn btn-danger");
                // btnFav.setAttribute("onclick", "like(this)");
                // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";
                // // btnFav.setAttribute("id", doc.id);
                // // var idFav = btnFav.getAttribute("id");
                // divInner2.appendChild(btnFav);

                //Modal Start Here (Ads Details)
                modaldiv = document.createElement("div");
                modaldiv.setAttribute("class", "modal fade");
                modaldiv.setAttribute("id", doc.id);
                modaldiv.setAttribute("role", "dialog");

                //Inner 01
                modaldivInner01 = document.createElement("div");
                modaldivInner01.setAttribute("class", "modal-dialog");
                modaldiv.appendChild(modaldivInner01);

                //Inner 02
                modaldivInner02 = document.createElement("div");
                modaldivInner02.setAttribute("class", "modal-content");
                modaldivInner01.appendChild(modaldivInner02);

                //Inner 03a (Header)
                modaldivInner03a = document.createElement("div");
                modaldivInner03a.setAttribute("class", "modal-header");
                modaldivInner02.appendChild(modaldivInner03a);

                //Inner 03a Button (Close)
                modaldivInner03aButton = document.createElement("button");
                modaldivInner03aButton.setAttribute("type", "button");
                modaldivInner03aButton.setAttribute("class", "close");
                modaldivInner03aButton.setAttribute("data-dismiss", "modal");
                modaldivInner03aButton.innerHTML = "&times;"
                modaldivInner03a.appendChild(modaldivInner03aButton);

                //Inner 03a H4
                modaldivInner03ah4 = document.createElement("h4");
                modaldivInner03ah4.setAttribute("class", "modal-title");
                modaldivInner03ah4.innerHTML = doc.data().title;
                modaldivInner03a.appendChild(modaldivInner03ah4);

                //Inner 03b (Body)
                modaldivInner03b = document.createElement("div");
                modaldivInner03b.setAttribute("class", "modal-body");
                modaldivInner02.appendChild(modaldivInner03b);

                //Inner 03b (Body) Image
                modaldivInner03bImg = document.createElement("img");
                modaldivInner03bImg.setAttribute("class", "img-responsive");
                modaldivInner03bImg.setAttribute("width", "100%");
                modaldivInner03bImg.setAttribute("src", doc.data().image);
                modaldivInner03bImg.setAttribute("alt", doc.data().title);
                modaldivInner03bImg.innerHTML = doc.data().Description;
                modaldivInner03b.appendChild(modaldivInner03bImg);

                //Inner 03b (Body) Paragraph
                var modaldivInner03bbold1 = document.createElement("b");
                modaldivInner03bbold1.innerHTML = "Description:";
                modaldivInner03b.appendChild(modaldivInner03bbold1);

                modaldivInner03bPara = document.createElement("p");
                modaldivInner03bPara.innerHTML = doc.data().Description;
                modaldivInner03b.appendChild(modaldivInner03bPara);

                var modaldivInner03bbold2 = document.createElement("b");
                modaldivInner03bbold2.innerHTML = "Price: ";
                modaldivInner03b.appendChild(modaldivInner03bbold2);

                var modaldivInner03bPrice = document.createElement("span");
                modaldivInner03bPrice.innerHTML = doc.data().price;
                modaldivInner03b.appendChild(modaldivInner03bPrice);

                var br1 = document.createElement("br");
                modaldivInner03b.appendChild(br1);

                var modaldivInner03bbold3 = document.createElement("b");
                modaldivInner03bbold3.innerHTML = "Genre: ";
                modaldivInner03b.appendChild(modaldivInner03bbold3);

                var modaldivInner03bCategory = document.createElement("span");
                modaldivInner03bCategory.innerHTML = doc.data().category;
                modaldivInner03b.appendChild(modaldivInner03bCategory);

                var br2 = document.createElement("br");
                modaldivInner03b.appendChild(br2);

                var modaldivInner03bbold4 = document.createElement("b");
                modaldivInner03bbold4.innerHTML = "Year: ";
                modaldivInner03b.appendChild(modaldivInner03bbold4);

                var modaldivInner03bYear = document.createElement("span");
                modaldivInner03bYear.innerHTML = doc.data().year;
                modaldivInner03b.appendChild(modaldivInner03bYear);

                var br3 = document.createElement("br");
                modaldivInner03b.appendChild(br3);

                var modaldivInner03bbold5 = document.createElement("b");
                modaldivInner03bbold5.innerHTML = "Model: ";
                modaldivInner03b.appendChild(modaldivInner03bbold5);

                var modaldivInner03bModel = document.createElement("span");
                modaldivInner03bModel.innerHTML = doc.data().model;
                modaldivInner03b.appendChild(modaldivInner03bModel);

                var br4 = document.createElement("br");
                modaldivInner03b.appendChild(br4);

                if ("email" in localStorage) {
                    //Chat Button
                    modaldivInner03bChat = document.createElement("button");
                    modaldivInner03bChat.innerHTML = "Contact Now";
                    modaldivInner03bChat.setAttribute("type", "button");
                    modaldivInner03bChat.setAttribute("class", "btn btn-primary");
                    modaldivInner03bChat.setAttribute("onclick", "chatNow(this)");
                    modaldivInner03bChat.setAttribute("id", doc.id);
                    id = modaldivInner03bChat.getAttribute("id");
                    modaldivInner03b.appendChild(modaldivInner03bChat);

                    // Fav Button

                    btnFav = document.createElement("a");
                    btnFav.setAttribute("type", "button");
                    btnFav.setAttribute("class", "btn btn-danger");
                    btnFav.setAttribute("onclick", "like(this)");
                    btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i> Mark as Favorite";
                    btnFav.setAttribute("id", doc.id);
                    var idFav = btnFav.getAttribute("id");
                    modaldivInner03b.appendChild(btnFav);


                } else {
                    var modaldivInner03bMessage = document.createElement("p");
                    modaldivInner03bMessage.innerHTML = "Please<a style='text-decoration: none; color: red' href='SignIn.html'> SignIn</a> Your Account";
                    modaldivInner03bMessage.setAttribute("style", "color: red;");
                    modaldivInner03bMessage.setAttribute("class", "text-center");
                    modaldivInner03bMessage.setAttribute("id", "modalMessage")
                    modaldivInner03b.appendChild(modaldivInner03bMessage);
                }

                //Inner 03c (Footer)
                modaldivInner03c = document.createElement("div");
                modaldivInner03c.setAttribute("class", "modal-footer");
                modaldivInner02.appendChild(modaldivInner03c);

                //Inner 03c (Button Close)
                modaldivInner03cButton = document.createElement("button");
                modaldivInner03cButton.setAttribute("type", "button");
                modaldivInner03cButton.setAttribute("class", "btn btn-default");
                modaldivInner03cButton.setAttribute("data-dismiss", "modal");
                modaldivInner03cButton.innerHTML = "Close"
                modaldivInner03c.appendChild(modaldivInner03cButton);
                //Modal Ends Here

                divInner2.appendChild(modaldiv);
                //End DIV Inner 02

                div.appendChild(divInner1);
                div.appendChild(divInner2);
                posts.appendChild(div);
            })
        })
}


function searchByCategory() {
    var searchByCategory = document.getElementById("category").value;
    if (searchByCategory == "") {
        posts.innerHTML = "";
        getAllAds();
    }

    if (searchByCategory !== "") {
        posts.innerHTML = "";
        db.collection("ads").where("category", "==", searchByCategory)
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                    console.log(doc.data().category);

                    div = document.createElement("div");
                    div.setAttribute("class", "seprate col-sm-6 col-xs-12 col-md-4 col-lg-3 center-block");

                    //DIV INNER 01 Starts
                    divInner1 = document.createElement("div");
                    img1 = document.createElement("img");

                    divInner1.setAttribute("class", "image");
                    img1.setAttribute("class", "img-responsive");
                    img1.setAttribute("width", "100%");
                    img1.setAttribute("src", doc.data().image);
                    img1.setAttribute("alt", doc.data().title);

                    divInner1.appendChild(img1);
                    //End DIV Inner 01

                    //DIV Inner 02 Starts (Posts Ads)
                    divInner2 = document.createElement("div");
                    h3 = document.createElement("h3");
                    //p = document.createElement("p");
                    btn = document.createElement("a");
                    // btnFav = document.createElement("a");

                    divInner2.setAttribute("class", "content");
                    btn.setAttribute("type", "button");
                    btn.setAttribute("class", "btn btn-primary");
                    btn.setAttribute("data-toggle", "modal");
                    btn.setAttribute("data-target", "#" + doc.id);

                    // btnFav.setAttribute("type", "button");
                    // btnFav.setAttribute("class", "btn btn-danger");
                    // btnFav.setAttribute("onclick", "");

                    h3.innerHTML = doc.data().title;
                    btn.innerHTML = "Read More >>>";
                    // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";

                    divInner2.appendChild(h3);
                    divInner2.appendChild(btn);
                    // divInner2.appendChild(btnFav);

                    // btnFav = document.createElement("a");
                    // btnFav.setAttribute("type", "button");
                    // btnFav.setAttribute("class", "btn btn-danger");
                    // btnFav.setAttribute("onclick", "like(this)");
                    // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";
                    // // btnFav.setAttribute("id", doc.id);
                    // // var idFav = btnFav.getAttribute("id");
                    // divInner2.appendChild(btnFav);

                    //Modal Start Here (Ads Details)
                    modaldiv = document.createElement("div");
                    modaldiv.setAttribute("class", "modal fade");
                    modaldiv.setAttribute("id", doc.id);
                    modaldiv.setAttribute("role", "dialog");

                    //Inner 01
                    modaldivInner01 = document.createElement("div");
                    modaldivInner01.setAttribute("class", "modal-dialog");
                    modaldiv.appendChild(modaldivInner01);

                    //Inner 02
                    modaldivInner02 = document.createElement("div");
                    modaldivInner02.setAttribute("class", "modal-content");
                    modaldivInner01.appendChild(modaldivInner02);

                    //Inner 03a (Header)
                    modaldivInner03a = document.createElement("div");
                    modaldivInner03a.setAttribute("class", "modal-header");
                    modaldivInner02.appendChild(modaldivInner03a);

                    //Inner 03a Button (Close)
                    modaldivInner03aButton = document.createElement("button");
                    modaldivInner03aButton.setAttribute("type", "button");
                    modaldivInner03aButton.setAttribute("class", "close");
                    modaldivInner03aButton.setAttribute("data-dismiss", "modal");
                    modaldivInner03aButton.innerHTML = "&times;"
                    modaldivInner03a.appendChild(modaldivInner03aButton);

                    //Inner 03a H4
                    modaldivInner03ah4 = document.createElement("h4");
                    modaldivInner03ah4.setAttribute("class", "modal-title");
                    modaldivInner03ah4.innerHTML = doc.data().title;
                    modaldivInner03a.appendChild(modaldivInner03ah4);

                    //Inner 03b (Body)
                    modaldivInner03b = document.createElement("div");
                    modaldivInner03b.setAttribute("class", "modal-body");
                    modaldivInner02.appendChild(modaldivInner03b);

                    //Inner 03b (Body) Image
                    modaldivInner03bImg = document.createElement("img");
                    modaldivInner03bImg.setAttribute("class", "img-responsive");
                    modaldivInner03bImg.setAttribute("width", "100%");
                    modaldivInner03bImg.setAttribute("src", doc.data().image);
                    modaldivInner03bImg.setAttribute("alt", doc.data().title);
                    modaldivInner03bImg.innerHTML = doc.data().Description;
                    modaldivInner03b.appendChild(modaldivInner03bImg);

                    //Inner 03b (Body) Paragraph
                    var modaldivInner03bbold1 = document.createElement("b");
                    modaldivInner03bbold1.innerHTML = "Description:";
                    modaldivInner03b.appendChild(modaldivInner03bbold1);

                    modaldivInner03bPara = document.createElement("p");
                    modaldivInner03bPara.innerHTML = doc.data().Description;
                    modaldivInner03b.appendChild(modaldivInner03bPara);

                    var modaldivInner03bbold2 = document.createElement("b");
                    modaldivInner03bbold2.innerHTML = "Price: ";
                    modaldivInner03b.appendChild(modaldivInner03bbold2);

                    var modaldivInner03bPrice = document.createElement("span");
                    modaldivInner03bPrice.innerHTML = doc.data().price;
                    modaldivInner03b.appendChild(modaldivInner03bPrice);

                    var br1 = document.createElement("br");
                    modaldivInner03b.appendChild(br1);

                    var modaldivInner03bbold3 = document.createElement("b");
                    modaldivInner03bbold3.innerHTML = "Genre: ";
                    modaldivInner03b.appendChild(modaldivInner03bbold3);

                    var modaldivInner03bCategory = document.createElement("span");
                    modaldivInner03bCategory.innerHTML = doc.data().category;
                    modaldivInner03b.appendChild(modaldivInner03bCategory);

                    var br2 = document.createElement("br");
                    modaldivInner03b.appendChild(br2);

                    var modaldivInner03bbold4 = document.createElement("b");
                    modaldivInner03bbold4.innerHTML = "Year: ";
                    modaldivInner03b.appendChild(modaldivInner03bbold4);

                    var modaldivInner03bYear = document.createElement("span");
                    modaldivInner03bYear.innerHTML = doc.data().year;
                    modaldivInner03b.appendChild(modaldivInner03bYear);

                    var br3 = document.createElement("br");
                    modaldivInner03b.appendChild(br3);

                    var modaldivInner03bbold5 = document.createElement("b");
                    modaldivInner03bbold5.innerHTML = "Model: ";
                    modaldivInner03b.appendChild(modaldivInner03bbold5);

                    var modaldivInner03bModel = document.createElement("span");
                    modaldivInner03bModel.innerHTML = doc.data().model;
                    modaldivInner03b.appendChild(modaldivInner03bModel);

                    var br4 = document.createElement("br");
                    modaldivInner03b.appendChild(br4);

                    if ("email" in localStorage) {
                        //Chat Button
                        modaldivInner03bChat = document.createElement("button");
                        modaldivInner03bChat.innerHTML = "Contact Now";
                        modaldivInner03bChat.setAttribute("type", "button");
                        modaldivInner03bChat.setAttribute("class", "btn btn-primary");
                        modaldivInner03bChat.setAttribute("onclick", "chatNow(this)");
                        modaldivInner03bChat.setAttribute("id", doc.id);
                        id = modaldivInner03bChat.getAttribute("id");
                        modaldivInner03b.appendChild(modaldivInner03bChat);

                        // Fav Button

                        btnFav = document.createElement("a");
                        btnFav.setAttribute("type", "button");
                        btnFav.setAttribute("class", "btn btn-danger");
                        btnFav.setAttribute("onclick", "like(this)");
                        btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i> Mark as Favorite";
                        btnFav.setAttribute("id", doc.id);
                        var idFav = btnFav.getAttribute("id");
                        modaldivInner03b.appendChild(btnFav);


                    } else {
                        var modaldivInner03bMessage = document.createElement("p");
                        modaldivInner03bMessage.innerHTML = "Please<a style='text-decoration: none; color: red' href='SignIn.html'> SignIn</a> Your Account";
                        modaldivInner03bMessage.setAttribute("style", "color: red;");
                        modaldivInner03bMessage.setAttribute("class", "text-center");
                        modaldivInner03bMessage.setAttribute("id", "modalMessage")
                        modaldivInner03b.appendChild(modaldivInner03bMessage);
                    }

                    //Inner 03c (Footer)
                    modaldivInner03c = document.createElement("div");
                    modaldivInner03c.setAttribute("class", "modal-footer");
                    modaldivInner02.appendChild(modaldivInner03c);

                    //Inner 03c (Button Close)
                    modaldivInner03cButton = document.createElement("button");
                    modaldivInner03cButton.setAttribute("type", "button");
                    modaldivInner03cButton.setAttribute("class", "btn btn-default");
                    modaldivInner03cButton.setAttribute("data-dismiss", "modal");
                    modaldivInner03cButton.innerHTML = "Close"
                    modaldivInner03c.appendChild(modaldivInner03cButton);
                    //Modal Ends Here

                    divInner2.appendChild(modaldiv);
                    //End DIV Inner 02

                    div.appendChild(divInner1);
                    div.appendChild(divInner2);
                    posts.appendChild(div);
                })
            })
    }
}

function searchByText() {
    var titleAd = "";
    var titleCase;
    var searchByText = document.getElementById("search");
    var filter = searchByText.value.toLowerCase();
    console.log(filter);

    if (filter == "") {
        posts.innerHTML = "";
        getAllAds();
    }

    if (filter !== "") {
        posts.innerHTML = "";
        db.collection("ads")
            .onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);
                    // console.log(doc.data().category);

                    titleAd = doc.data().title;
                    titleCase = titleAd.toLowerCase().indexOf(filter);
                    // console.log(titleCase);

                    if (titleCase > -1) {
                        console.log("=");
                        div = document.createElement("div");
                        div.setAttribute("class", "seprate col-sm-6 col-xs-12 col-md-4 col-lg-3 center-block");

                        //DIV INNER 01 Starts
                        divInner1 = document.createElement("div");
                        img1 = document.createElement("img");

                        divInner1.setAttribute("class", "image");
                        img1.setAttribute("class", "img-responsive");
                        img1.setAttribute("width", "100%");
                        img1.setAttribute("src", doc.data().image);
                        img1.setAttribute("alt", doc.data().title);

                        divInner1.appendChild(img1);
                        //End DIV Inner 01

                        //DIV Inner 02 Starts (Posts Ads)
                        divInner2 = document.createElement("div");
                        h3 = document.createElement("h3");
                        //p = document.createElement("p");
                        btn = document.createElement("a");
                        // btnFav = document.createElement("a");

                        divInner2.setAttribute("class", "content");
                        btn.setAttribute("type", "button");
                        btn.setAttribute("class", "btn btn-primary");
                        btn.setAttribute("data-toggle", "modal");
                        btn.setAttribute("data-target", "#" + doc.id);

                        // btnFav.setAttribute("type", "button");
                        // btnFav.setAttribute("class", "btn btn-danger");
                        // btnFav.setAttribute("onclick", "");

                        h3.innerHTML = doc.data().title;
                        btn.innerHTML = "Read More >>>";
                        // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";

                        divInner2.appendChild(h3);
                        divInner2.appendChild(btn);
                        // divInner2.appendChild(btnFav);

                        // btnFav = document.createElement("a");
                        // btnFav.setAttribute("type", "button");
                        // btnFav.setAttribute("class", "btn btn-danger");
                        // btnFav.setAttribute("onclick", "like(this)");
                        // btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i>";
                        // // btnFav.setAttribute("id", doc.id);
                        // // var idFav = btnFav.getAttribute("id");
                        // divInner2.appendChild(btnFav);

                        //Modal Start Here (Ads Details)
                        modaldiv = document.createElement("div");
                        modaldiv.setAttribute("class", "modal fade");
                        modaldiv.setAttribute("id", doc.id);
                        modaldiv.setAttribute("role", "dialog");

                        //Inner 01
                        modaldivInner01 = document.createElement("div");
                        modaldivInner01.setAttribute("class", "modal-dialog");
                        modaldiv.appendChild(modaldivInner01);

                        //Inner 02
                        modaldivInner02 = document.createElement("div");
                        modaldivInner02.setAttribute("class", "modal-content");
                        modaldivInner01.appendChild(modaldivInner02);

                        //Inner 03a (Header)
                        modaldivInner03a = document.createElement("div");
                        modaldivInner03a.setAttribute("class", "modal-header");
                        modaldivInner02.appendChild(modaldivInner03a);

                        //Inner 03a Button (Close)
                        modaldivInner03aButton = document.createElement("button");
                        modaldivInner03aButton.setAttribute("type", "button");
                        modaldivInner03aButton.setAttribute("class", "close");
                        modaldivInner03aButton.setAttribute("data-dismiss", "modal");
                        modaldivInner03aButton.innerHTML = "&times;"
                        modaldivInner03a.appendChild(modaldivInner03aButton);

                        //Inner 03a H4
                        modaldivInner03ah4 = document.createElement("h4");
                        modaldivInner03ah4.setAttribute("class", "modal-title");
                        modaldivInner03ah4.innerHTML = doc.data().title;
                        modaldivInner03a.appendChild(modaldivInner03ah4);

                        //Inner 03b (Body)
                        modaldivInner03b = document.createElement("div");
                        modaldivInner03b.setAttribute("class", "modal-body");
                        modaldivInner02.appendChild(modaldivInner03b);

                        //Inner 03b (Body) Image
                        modaldivInner03bImg = document.createElement("img");
                        modaldivInner03bImg.setAttribute("class", "img-responsive");
                        modaldivInner03bImg.setAttribute("width", "100%");
                        modaldivInner03bImg.setAttribute("src", doc.data().image);
                        modaldivInner03bImg.setAttribute("alt", doc.data().title);
                        modaldivInner03bImg.innerHTML = doc.data().Description;
                        modaldivInner03b.appendChild(modaldivInner03bImg);

                        //Inner 03b (Body) Paragraph
                        var modaldivInner03bbold1 = document.createElement("b");
                        modaldivInner03bbold1.innerHTML = "Description:";
                        modaldivInner03b.appendChild(modaldivInner03bbold1);

                        modaldivInner03bPara = document.createElement("p");
                        modaldivInner03bPara.innerHTML = doc.data().Description;
                        modaldivInner03b.appendChild(modaldivInner03bPara);

                        var modaldivInner03bbold2 = document.createElement("b");
                        modaldivInner03bbold2.innerHTML = "Price: ";
                        modaldivInner03b.appendChild(modaldivInner03bbold2);

                        var modaldivInner03bPrice = document.createElement("span");
                        modaldivInner03bPrice.innerHTML = doc.data().price;
                        modaldivInner03b.appendChild(modaldivInner03bPrice);

                        var br1 = document.createElement("br");
                        modaldivInner03b.appendChild(br1);

                        var modaldivInner03bbold3 = document.createElement("b");
                        modaldivInner03bbold3.innerHTML = "Genre: ";
                        modaldivInner03b.appendChild(modaldivInner03bbold3);

                        var modaldivInner03bCategory = document.createElement("span");
                        modaldivInner03bCategory.innerHTML = doc.data().category;
                        modaldivInner03b.appendChild(modaldivInner03bCategory);

                        var br2 = document.createElement("br");
                        modaldivInner03b.appendChild(br2);

                        var modaldivInner03bbold4 = document.createElement("b");
                        modaldivInner03bbold4.innerHTML = "Year: ";
                        modaldivInner03b.appendChild(modaldivInner03bbold4);

                        var modaldivInner03bYear = document.createElement("span");
                        modaldivInner03bYear.innerHTML = doc.data().year;
                        modaldivInner03b.appendChild(modaldivInner03bYear);

                        var br3 = document.createElement("br");
                        modaldivInner03b.appendChild(br3);

                        var modaldivInner03bbold5 = document.createElement("b");
                        modaldivInner03bbold5.innerHTML = "Model: ";
                        modaldivInner03b.appendChild(modaldivInner03bbold5);

                        var modaldivInner03bModel = document.createElement("span");
                        modaldivInner03bModel.innerHTML = doc.data().model;
                        modaldivInner03b.appendChild(modaldivInner03bModel);

                        var br4 = document.createElement("br");
                        modaldivInner03b.appendChild(br4);

                        if ("email" in localStorage) {
                            //Chat Button
                            modaldivInner03bChat = document.createElement("button");
                            modaldivInner03bChat.innerHTML = "Contact Now";
                            modaldivInner03bChat.setAttribute("type", "button");
                            modaldivInner03bChat.setAttribute("class", "btn btn-primary");
                            modaldivInner03bChat.setAttribute("onclick", "chatNow(this)");
                            modaldivInner03bChat.setAttribute("id", doc.id);
                            id = modaldivInner03bChat.getAttribute("id");
                            modaldivInner03b.appendChild(modaldivInner03bChat);

                            // Fav Button

                            btnFav = document.createElement("a");
                            btnFav.setAttribute("type", "button");
                            btnFav.setAttribute("class", "btn btn-danger");
                            btnFav.setAttribute("onclick", "like(this)");
                            btnFav.innerHTML = "<i class='glyphicon glyphicon-heart'></i> Mark as Favorite";
                            btnFav.setAttribute("id", doc.id);
                            var idFav = btnFav.getAttribute("id");
                            modaldivInner03b.appendChild(btnFav);


                        } else {
                            var modaldivInner03bMessage = document.createElement("p");
                            modaldivInner03bMessage.innerHTML = "Please<a style='text-decoration: none; color: red' href='SignIn.html'> SignIn</a> Your Account";
                            modaldivInner03bMessage.setAttribute("style", "color: red;");
                            modaldivInner03bMessage.setAttribute("class", "text-center");
                            modaldivInner03bMessage.setAttribute("id", "modalMessage")
                            modaldivInner03b.appendChild(modaldivInner03bMessage);
                        }

                        //Inner 03c (Footer)
                        modaldivInner03c = document.createElement("div");
                        modaldivInner03c.setAttribute("class", "modal-footer");
                        modaldivInner02.appendChild(modaldivInner03c);

                        //Inner 03c (Button Close)
                        modaldivInner03cButton = document.createElement("button");
                        modaldivInner03cButton.setAttribute("type", "button");
                        modaldivInner03cButton.setAttribute("class", "btn btn-default");
                        modaldivInner03cButton.setAttribute("data-dismiss", "modal");
                        modaldivInner03cButton.innerHTML = "Close"
                        modaldivInner03c.appendChild(modaldivInner03cButton);
                        //Modal Ends Here

                        divInner2.appendChild(modaldiv);
                        //End DIV Inner 02

                        div.appendChild(divInner1);
                        div.appendChild(divInner2);
                        posts.appendChild(div);
                    }


                })
            })
    }

}