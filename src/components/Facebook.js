import React, { Component } from 'react';


const appId = process.env.REACT_APP_FACEBOOK_ID

class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: null,
    name: null,
    email: null,
    picture: null,
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : { appId },
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
  
      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);
  
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  responseFacebook = response => {
    if(!!response.name) {
      this.setState({
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      })
    } else {
      console.log('error')
    }
  }

  componentClicked = () => {
    if(!!this.state.name) {
      this.setState({
        isLoggedIn: true
      })
    }
  }

  render() {

    return (
      <div>
        
      </div>
    );
  }
}

export default Facebook;