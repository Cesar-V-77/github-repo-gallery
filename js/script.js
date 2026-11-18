//Div where the user data will be displayed with profile information
const profileData = document.querySelector(".user-data");

//Div where the user repositories will be displayed
const repoList = document.querySelector(".repo-list");

const allReposButton = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");

//Username of the user to fetch data from GitHub API
const username = "Cesar-V-77";

//Function to fetch user data from GitHub API
const fetchUserData = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  console.log(userData);
  displayUserData(userData);
};

fetchUserData();

//Function to display user data in the profileData div
const displayUserData = function (userData) {
  profileData.innerHTML = ""; // Clear previous user data
  profileData.classList.add("user-info"); // Add a class for styling

  const userDataDiv = document.createElement("div");
  userDataDiv.innerHTML = `<figure>
    <img src="${userData.avatar_url}" alt="user avatar" />
    </figure> 
    <div>
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Bio:</strong> ${userData.bio}</p>
    <p><strong>Location:</strong> ${userData.location}</p>
    <p><strong>Number of Public Repos:</strong> ${userData.public_repos}</p>
    </div>`;

  profileData.append(userDataDiv);
  fetchUserRepos(); // Call fetchUserRepos after displaying user data
};

//Function to fetch user repositories from GitHub API
const fetchUserRepos = async function () {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  );
  const reposData = await response.json();
  console.log(reposData);
  displayUserRepos(reposData);
};

//Function to display user repositories in the repoList div
const displayUserRepos = function (reposData) {
  repoList.innerHTML = ""; // Clear previous repo data

  for (const repo of reposData) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo"); // Add a class for styling
    repoItem.innerHTML = `<button class="repo-name">${repo.name}</button>`;
    repoList.append(repoItem);
  }
};

//Event listener for clicking on a repository name
repoList.addEventListener("click", function (e) {
  if (e.target.matches(".repo-name")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    fetchTargetRepo(repoName);
  }
});

//Function to fetch target repository data from GitHub API
const fetchTargetRepo = async function (repoName) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`,
  );
  const repoInfo = await response.json();
  console.log(repoInfo);

  // Fetch the languages used in the repository
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }
  console.log(languages);
  displayTargetRepo(repoInfo, languages);
};

const displayTargetRepo = function (repoInfo, languages) {
  repoData.innerHTML = ""; // Clear previous repo data
  const targetRepoDiv = document.createElement("div");
  targetRepoDiv.classList.add("repo-info"); // Add a class for styling
  targetRepoDiv.innerHTML = `<h3><strong>Name:</strong> ${repoInfo.name}</h3>
    <p><strong>Description:</strong> ${repoInfo.description}</p>
    <p><strong>Default Branch:</strong> ${repoInfo.default_branch}</p>
    <p><strong>Languages:</strong> ${languages.join(", ")}</p>
    <button><a href="${repoInfo.html_url}" target="_blank">View on GitHub</a></button>`;

  repoData.append(targetRepoDiv);

  repoData.classList.remove("hide"); // Show the repoData div
  allReposButton.classList.add("hide"); // Hide the allReposButton
};
