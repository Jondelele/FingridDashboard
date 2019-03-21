// Moduuli joka sisältää käyttäjän kirjautumiseen liittyvän 
// jQuery koodin
$(document).ready(function(){
  $("#but_submit").click(function(){
      var username = $("#txt_uname").val().trim();
      var password = $("#txt_pwd").val().trim();

      if( username != "" && password != "" ){
          $.ajax({
              url:'/authenticate',
              type:'post',
              data:{username,password},
              success:function(response){
                  var msg = "";
                  if(response == 1){
                      window.location = "api_authentication.js";
                  }else{
                      msg = "Invalid username and password!";
                  }
                  $("#message").html(msg);
              }
          });
      }
  });
});