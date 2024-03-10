window.baseAPI_URL = window.location.href.startsWith(
    "https://sebfvs.southeastbank.com.bd"
  )
    ? "https://sebfvs.southeastbank.com.bd/apiserver"
    : window.location.href.startsWith("https://localhost")
    ? "http://fvs.middleware.southeastbank.com.bd:8080/ecuser-1.0"
    : "https://sebfvs.southeastbank.com.bd/apiserver";
    // : "http://fvs.middleware.southeastbank.com.bd:8080/ecuser-1.0";
    // : "https://esign.digitalsignature.com.bd:8989/ecuser-1.0";

window.baseURL = window.location.href.startsWith(
    "https://sebfvs.southeastbank.com.bd"
  )
    ? "https://sebfvs.southeastbank.com.bd"
    : window.location.href.startsWith("https://localhost")
    ? "https://localhost:3000"
    : "https://sebfvs.southeastbank.com.bd";

window.CallBackURL = window.location.href.startsWith(
    "https://sebfvs.southeastbank.com.bd"
  )
    ? "https://sebfvs.southeastbank.com.bd/bank-login"
    : window.location.href.startsWith("https://localhost")
    ? "https://localhost:300/bank-login"
    : "https://sebfvs.southeastbank.com.bd/bank-login";
  
  
  window.ADcallBack = window.location.href.startsWith(
    "https://sebfvs.southeastbank.com.bd"
  )
    ? "https://sebfvs.southeastbank.com.bd/bank-login"
    : window.location.href.startsWith("https://localhost")
    ? "https://localhost:300/bank-login"
    : "https://sebfvs.southeastbank.com.bd/bank-login";

  window.bankLogin = window.location.href.startsWith(
    "https://sebfvs.southeastbank.com.bd"
  )
    ? "http://smartlogin.southeastbank.com.bd/smartloginapplication/login.aspx"
    : window.location.href.startsWith("https://localhost")
    ? "http://172.17.253.183/smartloginapplication/login.aspx"
    : "http://172.17.253.183/smartloginapplication/login.aspx";
  
    window.security_key ='9fdbf29e-bba8-4d19-bfdf-b2f956ff3f6c'

    // window.SessionWarning = 600000
    // window.SessionTimeOut = 900000
    window.SessionWarning = 600000
    window.SessionTimeOut = 900000