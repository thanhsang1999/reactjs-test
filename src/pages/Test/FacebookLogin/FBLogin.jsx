import { Facebook } from "@material-ui/icons";
import React from "react";
// import ReactFacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";

function FBLogin(props) {
  const responseFacebook = (response) => {
    console.log(response);
  };
  const componentClicked = () => {};
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div>
      {/* <ReactFacebookLogin
        appId="2913278132245882"
        autoLoad={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        icon="fa-facebook"
      />
      <GoogleLogin
        clientId="674477289236-kepggn1fu8m2s93kfg59g07s96578kaa.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
    </div>
  );
}

export default FBLogin;
