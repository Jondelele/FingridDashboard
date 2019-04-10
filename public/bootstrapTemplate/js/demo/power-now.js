var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
  if (this.status == 200) {
    var response = JSON.parse(this.responseText);
    var electricityPowerData = [];

    $("#power-now").text(response[response.length-1].value + " MW");

    var powerNowPercent = (Math.abs(response[response.length-1].value)/1300*100).toPrecision(3);
    
    $("#power-progress-bar").attr("style", "width: " + powerNowPercent + "%");
    $("#power-now-percent").text(powerNowPercent);

  } else {
    $("#power-now").text("Couldn't load data");
    document.getElementById("progress-bar").value = "0";
  }
});

xhr.open('GET', '/data/lastday');
xhr.send();