var rootURL = "https://api.github.com";

function getRepositories() {
  var username = document.getElementById('username').value;
  var uri = rootURL + "/users/" + username + "/repos";
  var req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", uri);
  req.send();
}

function showRepositories() {
  var repositories = JSON.parse(this.responseText);
  var repoList = `<ul>${repositories.map(repo => '<li><strong>' + repo.name + '</strong> - <a href="' + repo.html_url + '" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="getCommits(this)">' + repo.html_url + '</a> - <a href="#" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(repo) {
  event.preventDefault();
  var username = repo.dataset.username;
  var repository = repo.dataset.repository;
  var uri = rootURL + "/repos/" + username + "/" + repository + "/commits";
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri);
  xhr.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  var commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches() {
  debugger; //did we make it?
  //we are getting all the way to here. Now all you have to do is make the last XHR request, make a list and
  //place it in the DOM and make sure all the Learn Tests pass. Then, go back and refactor according to their
  //solution for best practies. 
}
