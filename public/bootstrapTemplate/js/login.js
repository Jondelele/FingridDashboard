// Moduuli joka sisältää käyttäjän kirjautumiseen liittyvän 
// jQuery koodin
$(document).ready(function(){
  $("#but_submit").click(function(){
      var username = $("#txt_uname").val().trim();
      var password = $("#txt_pwd").val().trim();

      // Jos username ja password eivät ole tyhjiä niin mennään serverin puolelle tarkistamaan ovat
      // kirjautumistunnukset oikeita. Nodejs servulla route /authenticate käynnistää, koska käyttäjä
      // pitää authenticoida. Käyttäjän username ja password lähetetään data objectissa nodejs servulle
      if( username != "" && password != "" ){
          $.ajax({
              url:'/authenticate',
              type:'post',
              data:{username,password},
              success:function(response){
                // Palautetaan clientille index.html sivu
                window.location = "/bootstrapTemplate/index.html";
              }
          });
      }
  });
});