function getRepositories() {
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function showRepositories() {
  debugger; //it isn't getting to here... the link is valid, it almost seems like the GET request isn't completing or something.
  var returnedJSON = this.responseText;
  console.log(returnedJSON);
}
