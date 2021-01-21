var form = document.querySelector("form");
var userName = document.querySelector("#userName");
var email = document.querySelector("#email");
var address = document.querySelector("#address");
var city = document.querySelector("#city");
var contactNo = document.querySelector("#contactNo");
var submitBtn = document.querySelector(".submit-btn");
var updateBtn = document.querySelector(".update-btn");
var tbody = document.querySelector("tbody");
var position;
var id = Math.floor(Math.random() * 100);

function init() {
  var userList = getStorage();
  var libraryUserList = userList;
  insertRow(libraryUserList);
}
init();

function userInfo(event) {
    event.preventDefault();
    var info = {
        userName: event.target.form[0].value,
        email: event.target.form[1].value,
        address: event.target.form[2].value,
        city: event.target.form[3].value,
        contactNo:event.target.form[4].value,
        userId: id++

    }



  if(info.userName && info.email && info.address && info.city && info.contactNo){
  var userList = getStorage();
    userList.push(info)
    addStorage(userList);
    insertRow(userList);
    clearFields();
    }else{
     alert("Please Fill All The details")
    }
  }

  function insertRow(data) {
    tbody.innerHTML = "";
    data.forEach(function (value) {
      var tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${value.userId}</td>
      <td>${value.userName}</td>
      <td>${value.email}</td>
      <td>${value.address}</td>
      <td>${value.city}</td>
      <td>${value.contactNo}</td>
       <td><button type ="button" class="edit-btn" id="edit-btn">Edit</button></td>
      <td><button type ="button" class="delete-btn" id="delete-btn">Delete</button></td>`;
      tbody.appendChild(tr);
    });
  }
  
  function clearFields() {
    userName.value = "";
    email.value = "";
    address.value = "";
    city.value = "";
    contactNo.value = "";
    }

    tbody.addEventListener("click", onEdit);
function onEdit(event) {
  if (event.target.id == "edit-btn") {
    var userId = event.target.parentElement.parentElement.cells.item(0)
      .textContent;
    editField(userId);
  } else if (event.target.id == "delete-btn") {
    var userId = event.target.parentElement.parentElement.cells.item(0)
      .textContent;
    deleteField(userId);
    event.target.parentElement.parentElement.remove();
  }
}

function editField(data) {
  var userDetails = getStorage();
    userDetails.forEach(function (user, index) {
    if (user.userId == data) {
        
      userName.value = user.userName;
      email.value = user.email;
      address.value = user.address;
      city.value = user.city;
      contactNo.value = user.contactNo;
      updateBtn.style.display = "block";
      submitBtn.style.display = "none";
      position = index;
    }
  });
    
}

function deleteField(data) {
  var userDetails = getStorage();
    userDetails.forEach(function (user, index) {
        if (user.userId == data) {
       userDetails.splice(index, 1);
        }
    });
    addStorage(userDetails);
  alert("User Details Deleted Succesfully");
}

updateBtn.addEventListener("click", updateUserDetails);

function updateUserDetails(event) {
  var obj = {
      userId: id-1,
    userName: userName.value,
    email: email.value,
    address: address.value,
    city: city.value,
    contactNo:contactNo.value,
   };
   var userDetails = getStorage();
  userDetails.splice(position, 1, obj);
  addStorage(userDetails);
  insertRow(userDetails);
  clearFields();
  alert("User Details Updated  successfully");
  updateBtn.style.display = "none";
  submitBtn.style.display = "block";
}


function addStorage(userDetails) {
    localStorage.setItem("user", JSON.stringify(userDetails));
  
  }
 

  function getStorage(){
    if(localStorage.getItem("user")){
      var userList = localStorage.getItem("user");
      return JSON.parse(userList)
       
  }else{
    localStorage.setItem("user",'[]')
    var userList = localStorage.getItem("user");
    return JSON.parse(userList)
  }
  
  }
  