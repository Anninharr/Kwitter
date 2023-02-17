
//ADICIONE SEUS LINKS FIREBASE
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
userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = "Bem - Vindo " + userName + "!";

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}
function addRoom()
{
  room_name = document.getElementById("roomName").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionar nome da sala"
   });

   localStorage.setItem("room_name", room_name);

   window.location = "kwitterpage.html";
}


function logout() {
  localStorage.removeItem ("userName"); 
  window.location = "index.html";
}

  getData();
  
  function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
   window.location = "kwitterpage.html"; 
   
}