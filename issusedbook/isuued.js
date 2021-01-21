var userSelect= document.querySelector("#user");
var bookSelect = document.querySelector('#book');
var count = document.querySelector("#count");
var submit_btn  = document.querySelector("#issuedbook-btn");
var form = document.querySelector("#form");
var tbody = document.querySelector("tbody");
var showErrorMessage  =document.querySelector("#errormessage")
userSelect.addEventListener("click",selectUsers)
bookSelect.addEventListener('click',selectBooks)

/* var id = Math.floor(Math.random() * 100);

var userList = JSON.parse(localStorage.getItem("user"));
var bookList = JSON.parse(localStorage.getItem("book")); */

selectUsers()
selectBooks()
insertRow()







function selectUsers(){

  var userList = localStorage.getItem("user");
  if (userList == null) {
    userData = [];
  } else {
    userData = JSON.parse(userList);
  }
 var userSelectHtml = "";
 var userDeatils = document.getElementById("userlist") 
 userData.forEach((user) => {
   userSelectHtml +=`<a class="dropdown-item" href="#" onclick="getUserss()">${user.userName}</a>`
});
userDeatils.innerHTML = (userSelectHtml);
 }
function getUserss(){
   document.getElementById("user").innerHTML = event.target.innerHTML;
 }


 
function selectBooks(){


  let bookList = localStorage.getItem("book");
  if (bookList == null) {
    bookData = [];
  } else {
    bookData = JSON.parse(bookList);
  }
 var bookSelectHtml ="";
  var bookDetails = document.getElementById("booklist") 
  console.log(bookDetails)
  bookData.forEach((book) => {
  bookSelectHtml +=`<a class="dropdown-item" href="#" onclick="getBooks()">${book.bookName}</a>`

});
  bookDetails.innerHTML = (bookSelectHtml);
}
function getBooks(){
  document.getElementById("book").innerHTML = event.target.innerHTML;
}

function insertRow(){

  let localissuedBooks = localStorage.getItem("localissuedbooks");
   if (localissuedBooks == null) {
    getBookDetails = [];
   } else {
    getBookDetails = JSON.parse(localissuedBooks);
   }

  var tbodyHtml = "";
  var tbodyList = document.getElementById("tbody")
  var groupedPeople = group(getBookDetails,'userName');
console.log(groupedPeople)
Object.keys(groupedPeople).map(function(key,value){
  return (tbodyHtml +=`<tr>
  <th>${value + 1}</th>
<td>${key}</td>
<td> <ul id="ul"> ${Object.values(groupedPeople[key]).map(function (totalcount) {
      return `<li>${totalcount.bookName}_${totalcount.count}</li>`;
    })}
</li>
</ul>
</td>
</tr> `)
})

tbodyList.innerHTML = (tbodyHtml);
} 
 
function issuedBookOnclick(event){

  showErrorMessage.innerHTML = "";

var enteredBookCout = parseInt(count.value);
  console.log(typeof enteredBookCout)

  var bookSelected = document.getElementById("book").innerHTML;
  
  var books = JSON.parse(localStorage.getItem("book"));
  console.log(books)
var bookCheck = books.find((book) => {
    return book.bookName == bookSelected;
  });
  console.log(bookCheck.quanity)
  var availableQuantity = parseInt(bookCheck.quanity);

   if (enteredBookCout <= availableQuantity) {


  event.preventDefault();
  var issusedBookDetails = {
    userName: event.target.form[0].innerHTML,
    bookName: event.target.form[1].innerHTML,
    count: event.target.form[2].value,
   
   };
var localissuedBooks = localStorage.getItem("localissuedbooks");
   if (localissuedBooks == null) {
    getBookDetails = [];
   } else {
    getBookDetails = JSON.parse(localissuedBooks);
   }
 
  
   getBookDetails.push(issusedBookDetails)


   var updateQuantity = availableQuantity - enteredBookCout;
   var quantityUpdated = updateQuantity.toString();



   var  result = books.map(function (book) {
    if (bookSelected == book.bookName) {
      
      book.quanity = quantityUpdated;

      book.issuedbooks= parseInt(book.issuedbooks)+parseInt( enteredBookCout);
    }
    return book;
  });
  console.log(result);
  localStorage.setItem("book", JSON.stringify(result));
 

  localStorage.setItem("localissuedbooks", JSON.stringify(getBookDetails));
   insertRow();
}else {
  showErrorMessage.innerHTML =
      "You Enter quanity is " +
      count.value +
      " But There is  " +
      availableQuantity +
      "  books only  available";
  }
}




function group(objectArray, property){
  console.log(objectArray)
  console.log(property)

  
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  
  
}










