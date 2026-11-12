//Div where the user data will be displayed with profile information
const profileData = document.querySelector(".user-data");

//Div where the user repositories will be displayed
const repoList = document.querySelector(".repo-list");

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
