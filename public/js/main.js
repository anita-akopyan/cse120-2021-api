

///
function showSurveyResult(nodeElementId) {
    const nodeElement = document.getElementById(nodeElementId);
  // e.preventDefaults;
  console.log("The current value is", FavBook);
  $.ajax({
    type: 'POST',
    url: "https://cse-120-2021-api-anita.herokuapp.com/data",
    data: FavBook,
    cache: false,
    dataType : 'json',
    success: function (data) {
      displayData(data, nodeElement);
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


var loadedData = [];


function loadEditBookItem() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem('editItem'));
  console.log(editItem);
  document.getElementById("_id").value = editItem["_id"];
  
  document.getElementById("fullname").value = editItem["FullName"];   
  document.getElementById("title").value = editItem["Title"];
  document.getElementById("author").value = editItem["Author"];   
  document.getElementById("color").value = editItem["Color"];   
  document.getElementById("covertype").value = editItem["CoverType"]; 
  document.getElementById("numofpages").value = editItem["Numofpages"]; 
  document.getElementById("Language").value = editItem["Language"]; 
  document.getElementById("publisher").value = editItem["Publisher"]; 
  document.getElementById("publishdate").value = editItem["PublishDate"];
  document.getElementById("genre").value = editItem["Genre"];     
    
}


function editData(id) {
  var tmp = id.split("edit_");
  var item_id = tmp[1];

  loadedData.forEach(item => {
      if ( item._id == item_id) {
          console.log(item); 
          localStorage = window.localStorage;
          localStorage.setItem('editItem', JSON.stringify(item));
          if (item["project"] == "Favorite Books"|| (item["projectName"] == "Favorite Books")) {
          document.location  = "edit_books.html"; 
          } else {
          document.location  = "edit_music.html"; 
          }
      }
  })
}



function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse-120-2021-api-anita.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
    var tmp = {
        "test": "Data"
    }

    $.ajax({
        type: 'POST',
        url: "https://cse-120-2021-api-anita.herokuapp.com/data",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
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
function updateData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.FullName = document.getElementById("fullname").value;
  updatedBook.Title = document.getElementById("title").value;
  updatedBook.Author = document.getElementById("author").value;  
  updatedBook.Color = document.getElementById("color").value;
  updatedBook.CoverType = document.getElementById("covertype").value;
  updatedBook.Numofpages = document.getElementById("numofpages").value;
  updatedBook.Language = document.getElementById("Language").value;
  updatedBook.Publisher = document.getElementById("publisher").value;
  updatedBook.PublishDate = document.getElementById("publishdate").value;
  updatedBook.Genre = document.getElementById("genre").value;
      $.ajax({
      type: 'POST',
      url: "https://cse-120-2021-api-anita.herokuapp.com/data/update",
      data: updatedBook,
      cache: false,
      dataType : 'json',
      success: function (data) {
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

//new
function loadExistingData() {
  const myArtistHobbyData = [];
  const favBookData = [];
  const otherData = [];
  $.ajax({
      type : "GET",
      url : "https://cse-120-2021-api-anita.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        loadedData = data.data;
        loadedData.forEach(elem => {
          if (elem["owner"] === "Anita") {
            if (elem["project"] === "Survey: Stay Artsy") {
              myArtistHobbyData.push(elem);
            } else {
              favBookData.push(elem);
            }
          } else {
            otherData.push(elem)
          }
        })
        displayData(myArtistHobbyData, "artsDataContainer");
        displayData(favBookData, "bookDataContainer");
        displayData(otherData, "otherDataContainer");
      },
      error : function(data) {
          console.log("Error => ", data)
      }
  });
}

function displayData(data, containerDivName) {
    document.getElementById(containerDivName).innerHTML = "";
    data.forEach(elem => {
        const item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
        if (Object.keys(elem).length === 1) {
            const span = document.createElement("span");
            span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
            item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
            if (key != "_id") {
                const span = document.createElement("span");
                const b = document.createElement("b");
                b.innerHTML = key + ": ";
                span.appendChild(b);
                span.className = "item";
                if (elem[key]) {
                    span.innerHTML += elem[key];
                } else {
                    const span1 = document.createElement("span");
                    span1.className = "undefined";
                    span1.innerHTML = "N/A";
                    span.appendChild(span1)
                }
                item.appendChild(span);
                const br = document.createElement("br");
                item.appendChild(br);
            }
        })

        if (elem["owner"] == "Anita") {
          const button2 = document.createElement("button");
          button2.innerHTML = "Edit";
          button2.className = "editButton";
          button2.id = "edit_"+ elem["_id"];
          button2.addEventListener("click", function(e){
          editData("edit_"+ elem["_id"]);
          }, false);
          item.appendChild(button2);
          
        }

        if (elem["owner"] == "Anita" || (elem["FullName"] && elem["FullName"].includes("Anita"))) {
          const button = document.createElement("button");
          button.innerHTML = "Delete";
          button.id = elem["_id"];
          button.addEventListener("click", function(e){
          deleteData(elem["_id"]);
          }, false);
          item.appendChild(button);
         }
         document.getElementById(containerDivName).appendChild(item);
    })
    

}

