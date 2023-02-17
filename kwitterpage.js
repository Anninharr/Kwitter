const firebaseConfig = {
    apiKey: "AIzaSyAxmMpyIWtOYtDSci2kC5DxW90qCBqyvqk",
    authDomain: "vamos-conversar-d6ea0.firebaseapp.com",
    databaseURL: "https://vamos-conversar-d6ea0-default-rtdb.firebaseio.com",
    projectId: "vamos-conversar-d6ea0",
    storageBucket: "vamos-conversar-d6ea0.appspot.com",
    messagingSenderId: "867391132407",
    appId: "1:867391132407:web:93cdb899fe250b689d39f2"
  };
  firebase.initializeApp(firebaseConfig);

  username=localStorage.getItem("userName");
  room_name=localStorage.getItem("room_name");

  console.log (username);
  console.log (room_name);

  function logout() {
    localStorage.removeItem ("userName"); 
    localStorage.removeItem ("room_name");
    window.location = "index.html";
  }

  function enviar() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push(
        {
            name:username,
            message:msg,
            like:0
        }
    );
    document.getElementById("msg").value="";
  }
  
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    name = message_data['name'];
    message = message_data['message'];
    like = message_data ['like'];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag = "<h4 class='message_h4'> " + message + "</h4>";
button ="<button class= 'btn btn-warning' id="+firebase_message_id+" value="+like+"onclick= 'updateLike(this.id)'>";

      span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"; 

    row = name_with_tag + message_with_tag + button + span_with_tag;
    document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
     button_id = message_id;
     likes = document.getElementById(button_id).value;
     updated_likes = Number(likes) + 1;
     console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes
      });
    }
  