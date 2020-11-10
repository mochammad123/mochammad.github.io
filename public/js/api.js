// Get data Liga BBVA (Liga Spanyol)
// Mendeklarasikan data dari FootBall Api
const baseUrl = "https://api.football-data.org/v2/";
const apiToken = 'c437b5e199b54d6c9ce3c557166a2913';
const idLeague = 2014;

var endpointClassment = `${baseUrl}competitions/${idLeague}/standings`;
var endpointTopscores = `${baseUrl}competitions/${idLeague}/scorers`;

var teamData;



var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': apiToken
    }
  });
}


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json

function getClassment() {
  if ('caches' in window) {
  caches.match(endpointClassment).then(function (response) {
    if (response) {
      response.json().then(function (data) {
        classmentHtml(data);
        
      });
    }
  });
}

fetchApi(endpointClassment)
  .then(status)
  .then(json)
  .then(function(data) {
    classmentHtml(data)   
  })
  .catch(error);
}

function classmentHtml(data){
  var classmentHtml = '';


  var str = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
  data = JSON.parse(str);
  
  data.standings[0].table.forEach(function(team){
    classmentHtml+= `<tr>
    <td class="center-align">${team.position}</td>
    <td>
      <p class="hide-on-small-only">
        <img class = "show-on-medium-and-up show-on-medium-and-down" src=${team.team.crestUrl}  alt="logo team" style="float:left;width:22px;height:22px;margin-right:20px">
        <span style="color: blue">${team.team.name}</scan>
      </p>
      <p class="hide-on-med-and-up">
        <img src=${team.team.crestUrl}  alt="logo team" style="float:left;width:22px;height:22px;margin-right:20px">
      </p>
    </td>
    <td class="center-align">${team.playedGames}</td>
    <td class="center-align">${team.won}</td>
    <td class="center-align">${team.draw}</td>
    <td class="center-align">${team.lost}</td>
    <td class="center-align">${team.goalsFor}</td>
    <td class="center-align">${team.goalsAgainst}</td>
    <td class="center-align">${team.goalDifference}</td>
    <td class="center-align">${team.points}</td>
    </tr>
  `;
  })
  document.getElementById("classment").innerHTML = classmentHtml;

}


function getTopScores() {
  if ('caches' in window) {
  caches.match(endpointTopscores).then(function (response) {
    if (response) {
      response.json().then(function (data) {
        topScoresHtml(data);
        
      });
    }
  });
}

fetchApi(endpointTopscores)
  .then(status)
  .then(json)
  .then(function(data) {
    topScoresHtml(data)   
  })
  .catch(error);
}

function topScoresHtml(data){
  var topScorerHtml = '';


  var str = JSON.stringify(data).replace(/^http:\/\//i, 'https://');
  data = JSON.parse(str);
  
  data.scorers.forEach(function(score){
    topScorerHtml+= `
    <div class="col s12 m12 l6">
    <div class="right-align">
     <a class="fav red waves-effect waves-light btn"><i class="material-icons right"></i>Add to Favorite</a>
    </div>
      <div class="card horizontal">
       <div class="card-image">
        <img src="/aset/images/superman.png">
       </div>
       <div class="card-stacked">
        <div class="card-content">
         <div center-align>
          <h5 class="center-align" style="color: blue">${score.player.name}</h5>
          <h6 class="center-align">${score.team.name}</h6>
          <h6 class="center-align">${score.player.position}</h6>
          <h6 class="center-align">Number of Goals : ${score.numberOfGoals}</h6>
         </div>
        </div>
       </div>
      </div>
    </div>
        `;
  })
  document.getElementById("topscores").innerHTML = topScorerHtml;

  const el = document.getElementById("topscores").getElementsByClassName("fav");
  for (let i = 0; i < el.length; i++) {
      el[i].onclick = () => {
          const saveTopScore = {
              id: data.scorers[i].player.id,
              name: data.scorers[i].player.name,
              nameTeam: data.scorers[i].team.name,
              position: data.scorers[i].player.position,
              numberOfGoals: data.scorers[i].numberOfGoals
          };
          dbSaveTopscore(saveTopScore)
      }
  }
}

function topScoreFavorite() {
  dbTopScoreFavorite();
}