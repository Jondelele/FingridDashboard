// id for user, callback funktiota kutsutaan myöhemmin saadulla datalla
var getUser = (id, callback) => {
  // Tehdään dummy user objecti testaamista varten. Myöhemmin user data
  // tuloo oikeasta databasesta
  var user = {
    id: id,
    name: 'Vikram'
  };
  setTimeout(() => {
    // Kutsutaan callback funkkaria lopuksi kun data ollaan saatu
    callback(user);
  }, 3000);
  
};
// Toinen parametri on se funktio jonka haluamme ajaa kun userData
// tuloo takasin. Oletetaan että saamme user datan takasin.
// Eli siis funkkaria getUser kutsutaan user ID:llä ja callback
// funkkarilla joka siis ajetaan sen jälkeen kun user data on noudettu.
getUser(31, (userObject) => {
  console.log(userObject);
});