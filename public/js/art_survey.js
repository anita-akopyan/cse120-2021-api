var Artsy = {
  "owner": "Anita",
  "project": "Stay Artsy",
  "Name": "",
  "Study": "",
  "Where": "",
  "Painter": "",
  "ArtStyle": "",
  "PaintStyle": [],
  "HowOft": "",
  "Gallery": "",
  "House": "",
}


function handleChange(e) {
  if (e.target.name === 'PaintStyle') {
    if (e.target.checked && !Artsy[e.target.name].includes(e.target.value)) {
      Artsy[e.target.name].push(e.target.value);
    } else if (!e.target.checked && Artsy[e.target.name].includes(e.target.value)) {
      Artsy[e.target.name].splice(Artsy[e.target.name].indexOf(e.target.value), 1)
    }
  } else {
    Artsy[e.target.name] = e.target.value;
  }
}

function handleStudyChange() {
  Artsy.Study = document.getElementById("study").value;
}

function handleWhereChange() {
  Artsy.Where = document.getElementById("where").value;
}

function handlePainterChange() {
  Artsy.Painter = document.getElementById("painter").value;
}


function handleArtStyleChange() {
  var artValue = document.getElementsByName
    ("ArtStyle")

  for (i = 0; i < artValue.length; i++) {
    if (artValue[i].checked)
      Artsy.ArtStyle = artValue[i].value
  }
}


function handlePaintStyleChange(e) {
  var value = e.target.id;
  if (e.target.value === "on") {
    Artsy.PaintStyle = Artsy.PaintStyle + "," + value;
  }
}

function handleHowOftChange() {
  Artsy.HowOft = document.getElementById("howoft").value;
}

function handleGalleryChange() {
  Artsy.Gallery = document.getElementById("gallery").value;
}



function handleHouseChange() {
  Artsy.House = document.getElementById("house").value;
}



function saveData(e) {
  console.log(Artsy);
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: "https://cse-120-2021-api-anita.herokuapp.com/data",
    data: Artsy,
    cache: false,
    dataType: 'json',
    success: function (data) {
      console.log(data)
      // location.href = localStorage.getItem('prev-page-url');
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