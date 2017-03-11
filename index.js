var rootURL = "https://api.github.com";

function getRepositories() {
  var username = document.getElementById('username').value;
  var uri = rootURL + "/users/" + username + "/repos";
  debugger; //check uri variable
  var req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", uri);
  debugger; //check req.open
  req.send();
  debugger;
  // return false;
  debugger;
}

function showRepositories() {
  var repositories = JSON.parse(this.responseText);
  debugger; //check repositories variable
  var repoList = `<ul>${repositories.map(repo => '<li><strong>' + repo.name + '</strong> - <a href="' + repo.html_url + '">' + repo.html_url + '</a></li>').join('')}</ul>`;
  debugger;
  document.getElementById('repositories').innerHTML = repoList;
  debugger;
}
