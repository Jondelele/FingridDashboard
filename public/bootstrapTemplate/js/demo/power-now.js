var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
  if (this.status == 200) {
    var response = JSON.parse(this.responseText);
    var electricityPowerData = [];

    console.log("Arrayn koko: " + response.length);

    $("#power-now").text(response[response.length-1].value + " MW");
  
  } else {
    $("#power-now").text("Couldn't load data");
  }
});

xhr.open('GET', '/data/lastday');
xhr.send();