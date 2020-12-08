window.onload = function () {
    document.querySelector(".text").classList.add("spaced");
  
    const steps = document.querySelectorAll(".advice");
    var count = 0;
    setInterval(() => {
      steps[count].style.display = "block";
      steps[count].style.opacity = "1.0";
    }, 3000);
  };


  var ts = new Date;
  ts = ts.getTime();
  let url = 'https://cdn.abplive.com/coronastats/prod/coronastats-new.json?ts='+ts;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data)
      appendData(data);
    })
    .catch(function (err) {
      console.log(err);
    });

  function appendData(data) {
    let stateCount = document.getElementById("stateCount");
    let totalCases = document.getElementById("totalCases");
    let recovered = document.getElementById("recovered");
    let death = document.getElementById("death");
    //console.log(data.statewise.length)

    totalCases.innerHTML = data.totalConfirmed;
    recovered.innerHTML = data.totalRecovered;
    death.innerHTML = data.totalDeaths;
  }
