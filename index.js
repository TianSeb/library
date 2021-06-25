myLibrary = [];

function bookCreator(title, author, pages, read) {
  const book = {
    "title_1": title, "author_2": author,
    "pages_3": pages, "read_4": read
  };
  myLibrary.push(book);
  updateTable(book);
  saveLibrary();
}

function saveLibrary () {
  localStorage.setItem("bookLibrary", JSON.stringify(myLibrary));
}

//add books to the table. Assigns delete & update button to each row
function updateTable(object) { 
  const row = document.createElement("tr");
  var bookIndex = myLibrary.findIndex(function(book,index){
    if (book.title_1 == object.title_1) return true;
  });
  
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i++) {
    var columnData = document.createElement("td");
    columnData.textContent = object[keys[i]];
    row.appendChild(columnData);
  }

  //update status Button
  const updateButton = document.createElement("button");
  updateButton.classList.add("updBtn");
  updateButton.textContent = "Status";
  updateButton.dataset.book = bookIndex;
  row.appendChild(updateButton);

  //delete button assign
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delBtn");
  deleteButton.textContent = "Delete";
  deleteButton.dataset.book = bookIndex;
  row.appendChild(deleteButton);

  //Append and Update
  const dataTable = document.getElementById("dataTable");
  dataTable.appendChild(row);
  deleteBtns();
  updateBtns();
}

function deleteBtns() { //remove and update status interface
  const delButtons = Array.from(document.getElementsByClassName("delBtn"));

  delButtons.forEach(x => x.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    var row = e.target.parentNode;
    row.parentNode.removeChild(row);
    let index = (parseInt(e.target.dataset.book));
    myLibrary.splice(index,index+1);
    saveLibrary();
  }));
}

function updateBtns() {
  const statusButtons = Array.from(document.getElementsByClassName("updBtn"));

  statusButtons.forEach(x => x.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    var row = e.target.parentNode;
    let index = (parseInt(e.target.dataset.book));
    let value = myLibrary[index].read_4;
    //checks for read or not read
    if (value == "Read") {
      row.children[3].innerText = "Not Read";
      myLibrary[index].read_4 = "Not Read";
    }
    else {
      row.children[3].innerText = "Read";
      myLibrary[index].read_4 = "Read";
    }
    saveLibrary();
  }));
  
}

// Form configuration
const myForm = document.querySelector("form");

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("status").value;
  bookCreator(title,author,pages,read);
  myForm.reset();
});

// Program Init
if (localStorage.getItem('bookLibrary') === null) {
  myLibrary.push({
    "title_1": "The Hobbit",
    "author_2": "J.R.R Tolkien",
    "pages_3": 250,
    "read_4": "Not Read"
  });
  updateTable(myLibrary[0]);
  saveLibrary();
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem('bookLibrary'));
  booksFromStorage.forEach(x => myLibrary.push(x));
  myLibrary.forEach(x => updateTable(x));
}