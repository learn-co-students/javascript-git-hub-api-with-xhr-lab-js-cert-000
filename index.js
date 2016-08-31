var base = "https://api.github.com/"
var getRepositories = function(){
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", base + "users/" + username + "/repos");
  req.send();
}

var displayRepositories = function(evt){
  var repos = JSON.parse(this.responseText);
  let repoList = "<ul>";
  for(var i=0; i<repos.length; i++){
    repoList += "<li><a href=" + repos[i]["html_url"]  + ">" + repos[i]["name"] + "</a>";
    repoList += "<ul><li>";
    repoList += "<a href='#' onClick='getCommits(this);' data-username='" + repos[i]["owner"]["login"] + "' data-repository=" + repos[i]["name"] + ">commits</a> | ";
    repoList += "<a href='#' onClick='getBranches(this);' data-username='" + repos[i]["owner"]["login"] + "' data-repository=" + repos[i]["name"] + ">branches</a>";
    repoList += "</li></ul><br>";
    repoList += "</li>";
  }
  repoList += "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

var getCommits = function(link){
  const username = link.dataset.username;
  const reponame = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", base + "repos/" + username + "/" + reponame + "/commits");
  req.send();
  // console.log(link);
}

var displayCommits = function(){
  const commits = JSON.parse(this.responseText);
  // console.log(commits);
  let commitList = "<ul>";
  for (var i=0; i<commits.length; i++){
    commitList += "<li><a href='";
    commitList += commits[i]["html_url"] + "'>";
    if (commits[i]["author"]){
      commitList += commits[i]["commit"]["author"]["name"] + " (";
      commitList += commits[i]["author"]["login"] + ") | ";
      commitList += commits[i]["commit"]["message"] + "</a></li>"
    } else {
      commitList += "(null)</a></li>";
    }
  }
  commitList += "</ul>";
  document.getElementById("details").innerHTML = commitList;
}

var getBranches = function(link){
  const username = link.dataset.username;
  const reponame = link.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", base + "repos/" + username + "/" + reponame + "/branches");
  req.send();
  // console.log(link);
}

var displayBranches = function(){
  const branches = JSON.parse(this.responseText);
  // console.log(branches);
  let branchList = "<ul>";
  for (var i=0; i<branches.length; i++){
    branchList += "<li>";
    branchList += branches[i]["name"];
    branchList += "</li>";
  }
  branchList += "</ul>";
  document.getElementById("details").innerHTML = branchList;
}
