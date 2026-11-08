//Div where the user data will be displayed with profile information
const userData = document.querySelector("user-data");

//Username of the user to fetch data from GitHub API
const username = "Cesar-V-77";

//Function to fetch user data from GitHub API
const fetchUserData = async () => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const userData = await response.json();
  //   return userData;
  console.log(userData);
};

fetchUserData();
