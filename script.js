let usernameInput = document.getElementById("username")
let button = document.getElementById("search_btn")
let card = document.getElementById("card")


const data = {
    avatar_url: "https://i.pravatar.cc/150",
    name: "Piyush Jain",
    bio: "CSE Student | Web Developer | Learning AI",
    followers: 120,
    following: 80,
    public_repos: 15,
    login: "piyushjain"
}

// button.addEventListener("click", async () => {
//     try {
//         const response = await fetch(`https://api.github.com/users/${usernameInput.value}`)
//         if (!response.ok) {
//             card.innerHTML = "<p>User not found</p>";
//             return;
//         }
//         const data = await response.json();
        card.innerHTML = `
                    <img src="${data.avatar_url}">
                    <h2>${data.name}</h2>
                    <p class = "username">@${data.login} </p>
                    <p class = "bio">${data.bio}</p>
                    <p>Followers: ${data.followers}</p>
                    <p>Following: ${data.following}</p>
                    <p>Public Repositories: ${data.public_repos}</p>
                `
//     }
//     catch (error) {
//         console.log(error)
//         alert(error.message)
//     }

// })