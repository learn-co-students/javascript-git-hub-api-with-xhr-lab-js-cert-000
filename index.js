var rootURL = "https://api.github.com";

function getRepositories() {
  var username = document.getElementById('username').value;
  var uri = rootURL + "/users/" + username + "/repos";
  var req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", uri);
  req.send();
}

function displayRepositories() {
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

function getBranches(repo) {
  var username = repo.dataset.username;
  var repository = repo.dataset.repository;
  var uri = rootURL + "/repos/" + username + "/" + repository + "/branches";
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", displayBranches);
  xhr.open("GET", uri);
  xhr.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  var branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = branchesList;
}
