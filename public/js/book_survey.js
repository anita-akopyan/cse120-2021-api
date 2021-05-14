var FavBook = {
  "owner": "Anita",
  "project": "Favorite Books",
  "FullName": "",
  "Title": "",
  "Author": "",
  "Color": "",
  "CoverType": "",
  "Numofpages": "",
  "Language": "",
  "Publisher": "",
  "PublishDate": "",
  "Genre": [],
}


function handleFullNameChange() {
  FavBook.FullName = document.getElementById("fullname").value;
}

function handleTitleChange() {
  FavBook.Title = document.getElementById("title").value;
}

function handleAuthorChange() {
  FavBook.Author = document.getElementById("author").value;
}

function handleColorChange() {
  FavBook.Color = document.getElementById("color").value;
}


function handleCoverTypeChange() {
  FavBook.CoverType = document.getElementById("covertype").value;
}



function handleNumofpagesChange() {
  FavBook.Numofpages = document.getElementById("numofpages").value;
}

function handleLanguageChange(e) {
  var lang = document.getElementsByName("Language")

  for (i = 0; i < lang.length; i++) {
    if (lang[i].checked)
      FavBook.Language = lang[i].value

  }
}

function handlePublisherChange() {
  FavBook.Publisher = document.getElementById("publisher").value;
}

function handlePublishDateChange() {
  FavBook.PublishDate = document.getElementById("publishdate").value;
}

function handleGenreChange(e) {
 if (e.target.checked && !FavBook.Genre.includes(e.target.value)) {
    FavBook.Genre.push(e.target.value);
  } else if (!e.target.checked && FavBook.Genre.includes(e.target.value)) {
    FavBook.Genre.splice(FavBook.Genre.indexOf(e.target.value), 1)
  }
  
function saveData(e) {
  e.preventDefault();
  console.log("The current value is", FavBook);
  $.ajax({
    type: 'POST',
    url: "https://cse-120-2021-api-anita.herokuapp.com/data",
    data: FavBook,
    cache: false,
    dataType: 'json',
    success: function (data) {
      location.href = localStorage.getItem('prev-page-url');
      // displayData(data);
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");
    }
  });
}
