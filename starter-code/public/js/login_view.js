fb_login: function(e){
    e.preventDefault();

    FB.login(function(res) {
         console.log(res);
    }, { scope: 'public_profile, email'} );

},