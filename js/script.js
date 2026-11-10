//Div where the user data will be displayed with profile information
const profileData = document.querySelector(".user-data");

//Username of the user to fetch data from GitHub API
const username = "Cesar-V-77";

//Function to fetch user data from GitHub API
const fetchUserData = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  //   return userData;
  //   fetchUserData();
  console.log(userData);
  displayUserData(userData);
};

fetchUserData();

const displayUserData = function (userData) {
  profileData.innerHTML = ""; // Clear previous user data
  profileData.classList.add("user-info"); // Add a class for styling

  const userDataDiv = document.createElement("div");
  userDataDiv.innerHTML = `<figure>
    <img src="${userData.avatar_url}" alt="user avatar" />
    </figure>
    <p><strong>Name:</strong> ${userData.name}</p>
    <p><strong>Bio:</strong> ${userData.bio}</p>
    <p><strong>Location:</strong> ${userData.location}</p>
    <p><strong>Number of Public Repos:</strong> ${userData.public_repos}</p>`;

  profileData.append(userDataDiv);
};
