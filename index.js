function getRepositories() {
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.onload(showRepositories());
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function showRepositories() {
  var returnedJSON = this.responseText;
  console.log(returnedJSON);
}
