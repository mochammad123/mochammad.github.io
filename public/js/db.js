var dbPromise = idb.open("ballpoint", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favorites")) {
        var peopleOS = upgradeDb.createObjectStore("favorites");
        peopleOS.createIndex("id", "id", { unique: true });
    }
});

// read
function dbTopScoreFavorite() {
    dbPromise.then(function(db) {
        var tx = db.transaction('favorites', 'readonly');
        var store = tx.objectStore('favorites');
        return store.getAll();
    }).then(function(val) {
        var topScorerFavorite = "";
        val.forEach(function(score) {
            topScorerFavorite += `
            <div class="col s12 m12 l6">
            <div class="right-align">
             <a class="delete red waves-effect waves-light btn"><i class="material-icons right"></i>Delete Favorite</a>
            </div>
              <div class="card horizontal">
               <div class="card-image">
                <img src="/aset/images/superman.png">
               </div>
               <div class="card-stacked">
                <div class="card-content">
                 <div center-align>
                  <h5 class="center-align" style="color: blue">${score.name}</h5>
                  <h6 class="center-align">${score.nameTeam}</h6>
                  <h6 class="center-align">${score.position}</h6>
                  <h6 class="center-align">Number of Goals : ${score.numberOfGoals}</h6>
                 </div>
                </div>
               </div>
              </div>
            </div>
            `;
        });
        if(val.length === 0) topScorerFavorite += `<h6 class="center-align">No Top Scorers Favorite Found!!</6>`;
        document.getElementById("favorites").innerHTML = topScorerFavorite;

        const el = document.getElementById("favorites").getElementsByClassName("delete");
        for (let i = 0; i < el.length; i++) {
            el[i].onclick = () => {
                dbDeleteTopscore(val[i].name);
                dbTopScoreFavorite();
            }
        }

    });
}

// save
function dbSaveTopscore(score) {
    dbPromise.then(function(db) {
        var tx = db.transaction('favorites', 'readwrite');
        var store = tx.objectStore('favorites');
        store.put(score, score.name);
        return tx.complete;
    }).then(function() {
        M.toast({ html: `${score.name} berhasil disimpan!` })
        console.log('Top Scorer berhasil disimpan');
      }).catch(err => {
        console.error('Top Scorer gagal disimpan', err);
      });
}

// hapus
function dbDeleteTopscore(score) {
    dbPromise.then(function(db) {
        var tx = db.transaction('favorites', 'readwrite');
        var store = tx.objectStore('favorites');
        store.delete(score, score.name);
        return tx.complete;
    }).then(function() {
        var toastHTML = `Top Scorer Favorite berhasil dihapus!`;
        M.toast({ html: toastHTML });
        console.log('Top Scorer Favorite Berhasil dihapus');
    });
}