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



function saveData(e) {
  e.preventDefault();
    console.log("The current value is", Artsy);
  $.ajax({
    type: 'POST',
    url: "https://cse-120-2021-api-anita.herokuapp.com/data",
    data: Artsy,
    cache: false,
    dataType: 'json',
    success: function (data) {
      location.href = localStorage.getItem('prev-page-url');
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