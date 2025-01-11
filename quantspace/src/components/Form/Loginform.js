import React, { useState } from "react";
import Image from "./assets/image.png";
import Logo from "./assets/logo.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword ] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false); // Added state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    
    async function httpReq(type, url, headers, body) {
      var httpRequest = new XMLHttpRequest();
      return new Promise(function (resolve, reject) {
          // resolve or reject the promise when the response comes back
          httpRequest.onreadystatechange = function () {
          if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                  // resolve the promise and return the response text
                  resolve(httpRequest.responseText);
              }
              else if (httpRequest.readyState === 4) {
                  // reject the promise and return an error
                  reject(new Error(httpRequest.status + " (" + httpRequest.statusText + ") from " + url));
              }
          };
       
          // send the request
          httpRequest.open(type, url, true);
          headers = headers || [];
          for (var i = 0; i < headers.length; i++) {
              var header = headers[i];
              httpRequest.setRequestHeader(header.name, header.value);
          }
          httpRequest.send(body);
      });
      }
      function getJSON(http_response) {
          try {
              var json = JSON.parse(http_response.toString());
              return json;
       
          } catch (err) {
              throw new Error("Error in getJSON: " + err.message);
          }
      }

      try {   
          var token_url = "http://27.107.8.194:86/Aras28New/OAuthServer/connect/token";
       
          var token_headers = [
              { name: 'Content-Type', value: 'application/x-www-form-urlencoded' },
          ];
       
          var token_body = new URLSearchParams();
          token_body.append("grant_type", "password");
          token_body.append("scope", "Innovator");
          token_body.append("client_id", "IOMApp");
          token_body.append("username", username);
          token_body.append("password", password);
          token_body.append("database", "28_Demo");
       
          // get the token
          var token_res = await httpReq("POST", token_url, token_headers, token_body);
          var token_obj = getJSON(token_res);
          var token = token_obj.access_token;
          localStorage.setItem("authToken",token);
          setShowShimmer(true);
        } catch (err) {
        // alert("Wrong UserName or Password! Please try again.");
          // throw new Error("Error in getOAuthToken: " + err.message);
          setLoading(false);
          setErrorMessage("Login Failed!");
          setUsername("");
          setPassword("");
      }

};

if (showShimmer) {
  navigate("/home");
}

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "5px"}}>{errorMessage}</p>
            )}
            <form>
              <input type="email" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            required/>
              <div className="pass-input-div">
                <input  type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>                
                {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            )}                
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin} disabled={loading}>Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;