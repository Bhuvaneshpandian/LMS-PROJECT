var form = document.querySelector("form");
var isbn = document.querySelector("#isbn");
var bookName = document.querySelector("#bookName");
var author = document.querySelector("#author");
var publisher = document.querySelector("#publisher");
var quanity = document.querySelector("#quanity");
var submitBtn = document.querySelector(".submit-btn");
var updateBtn = document.querySelector(".update-btn");
var tbody = document.querySelector("tbody");
console.log(tbody)
var position;
var id = Math.floor(Math.random() * 100);



tbody.addEventListener("click", onEdit);
updateBtn.addEventListener("click", updateBookDetails);

function init() {
  var bookList = getStorage();
  console.log(bookList)
  insertRow(bookList);
}
init();


function showError(input, message) {
  console.log(input)
  var formControl = input.parentElement;
  console.log(formControl)
  formControl.className = "form-control error";
  var small = formControl.querySelector("small");
  small.innerText = message;

}

function showSuccess(input) {
  var formControl = input.parentElement;
  console.log(formControl)
  formControl.className = "form-control success";

}

function getUserId(input) {
  var getInputId = input.id;
  console.log(getInputId)
  return (getInputId.charAt(0).toUpperCase() + input.id.slice(1));
}

function myinput(inputs) {
  inputs.forEach(input => {
    console.log(input)
    if (input.value === "") {
      showError(input, `${getUserId(input)} must fill`)

    } else {
      showSuccess(input)

    }
  });
}

function bookInfo(event) {
  event.preventDefault();

  var info = {
    isbn: event.target.form[0].value,
    bookName: event.target.form[1].value,
    author: event.target.form[2].value,
    publisher: event.target.form[3].value,
    quanity: event.target.form[4].value,
    bookId: id++,
    issuedbooks: 0,
  }
  if (info.isbn && info.bookName && info.author && info.publisher && info.quanity) {
    var bookList = getStorage();
    bookList.push(info)
    addStorage(bookList)
    insertRow(bookList);
    clearFields();

  } else {
    myinput([isbn, bookName, author, publisher, quanity])

  }
}

function insertRow(books) {
  tbody.innerHTML = "";
  books.forEach(function (value,index) {
    var tr = document.createElement("tr");
    tr.innerHTML = `
    <th >${index + 1}</th>
      <td>${value.isbn}</td>
      <td>${value.bookName}</td>
      <td>${value.author}</td>
      <td>${value.publisher}</td>
      <td>${value.quanity}</td>
      <td>${value.issuedbooks}</td>
      
      <td><button type ="button" class="edit-btn" id="edit-btn">Edit</button></td>
      <td><button type ="button" class="delete-btn" id="delete-btn">Delete</button></td>`;


 
    tbody.appendChild(tr);
  });
}
function clearFields() {
  isbn.value = "";
  bookName.value = "";
  author.value = "";
  publisher.value = "";
  quanity.value = "";
}

function onEdit(event) {
  if (event.target.id == "edit-btn") {
    var bookId = event.target.parentElement.parentElement.cells.item(0)
      .textContent;
    editField(bookId);
  } else if (event.target.id == "delete-btn") {
    var bookId = event.target.parentElement.parentElement.cells.item(0)
      .textContent;
    deleteField(bookId);
    event.target.parentElement.parentElement.remove();
  }
}
function editField(data) {
  var bookDetails = getStorage();
  bookDetails.forEach(function (book, index) {
    if (book.bookId == data) {
      isbn.value = book.isbn;
      bookName.value = book.bookName;
      author.value = book.author;
      publisher.value = book.publisher;
      quanity.value = book.quanity;
      updateBtn.style.display = "block";
      submitBtn.style.display = "none";
      position = index;
    }
  });
}
function deleteField(data) {
  var bookDetails = getStorage();
  bookDetails.forEach(function (book, index) {
    if (book.bookId == data) {
      bookDetails.splice(index, 1);
    }
  });
  addStorage(bookDetails)
  alert("Book Details Deleted Succesfully");
}

function updateBookDetails(event) {
  var obj = {
    bookId: id - 1,
    isbn: isbn.value,
    bookName: bookName.value,
    author: author.value,
    publisher: publisher.value,
    quanity: quanity.value,
  };
  var bookDetails = getStorage();
  bookDetails.splice(position, 1, obj);
  addStorage(bookDetails)
  insertRow(bookDetails);
  clearFields();
  alert("Book Details Updated  successfully");
  updateBtn.style.display = "none";
  submitBtn.style.display = "block";
}
function addStorage(bookDetails) {
  localStorage.setItem("book", JSON.stringify(bookDetails));
}
function getStorage() {
  if (localStorage.getItem("book")) {
    var bookList = localStorage.getItem("book");
    return JSON.parse(bookList)
  } else {
    localStorage.setItem("book", '[]')
    var bookList = localStorage.getItem("book");
    return JSON.parse(bookList)
  }
}