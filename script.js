const token = "";

let usernameInput = document.getElementById("username")
let button = document.getElementById("search_btn")
let card = document.getElementById("card")


// const data = {
//     avatar_url: "https://i.pravatar.cc/150",
//     name: "Piyush Jain",
//     bio: "CSE Student | Web Developer | Learning AI",
//     location: "Greater Noida, India" ,
//     html_url: "https://github.com/PiyushJain-cmd", 
//     website_url: "https://piyushjain.dev",
//     created_at: "2023", 
//     followers: 120,
//     following: 80,
//     public_repos: 15,
//     login: "piyushjain"
// }


async function searchUser() {

    card.classList.remove("hidden");

    try {
        const response = await fetch(
            `https://api.github.com/users/${usernameInput.value.trim()}`
        );

        // const response = await fetch(
        //     `https://api.github.com/users/${usernameInput.value.trim()}`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // );

        // console.log("Limit:", response.headers.get("x-ratelimit-limit"));
        // console.log("Used:", response.headers.get("x-ratelimit-used"));
        // console.log("Remaining:", response.headers.get("x-ratelimit-remaining"));

        if (!response.ok) {
            console.log("Status:", response.status);
            console.log("Status Text:", response.statusText);

            card.innerHTML = `<p>Error: ${response.status}</p>`;
            return;
        }

        const data = await response.json();

        const reposResponse = await fetch(
            `https://api.github.com/users/${data.login}/repos?sort=stars&per_page=3`

            // sort repositories by stars + only return 3 repositories per page
        );

        // const reposResponse = await fetch(
        //     `https://api.github.com/users/${data.login}/repos?sort=stars&per_page=3`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     }
        // );

        const repos = await reposResponse.json();

        card.innerHTML = `
            <img src="${data.avatar_url}">
            <h2>${data.name || data.login}</h2>
            <p class="username">@${data.login}</p>
            <p class="bio">${data.bio || "No bio available"}</p>

            <div class="profile_info">

                <span>
                    <i class="fa-solid fa-location-dot"></i>
                    ${data.location || "Location not available"}
                </span>

                <a class="website_link" 
                   href="${data.blog || "#"}" 
                   target="_blank">
                    <i class="fa-solid fa-link"></i>
                    Website
                </a>

                <span>
                    <i class="fa-solid fa-calendar"></i>
                    Joined ${new Date(data.created_at).getFullYear()}
                </span>

            </div>

            <div class="stats">
                <div>
                    <strong>${data.followers}</strong>
                    <span>Followers</span>
                </div>

                <div>
                    <strong>${data.following}</strong>
                    <span>Following</span>
                </div>

                <div>
                    <strong>${data.public_repos}</strong>
                    <span>Public Repositories</span>
                </div>
            </div>


<div class="repos_header">
    <h3>Popular Repositories</h3>

    <a href="${data.html_url}?tab=repositories" target="_blank">
        View All →
    </a>
</div>


${repos.map(repo => `
    <div class="repo-card">

        <div class="repo-main">
            <i class="fa-solid fa-code"></i>

            <div>
                <h4>
                    <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                    </a>
                </h4>

                <p>
                    ${repo.description || "No description available."}
                </p>
            </div>
        </div>

        <div class="repo-stats">

            <span>
                <i class="fa-solid fa-circle"></i>
                ${repo.language || "N/A"}
            </span>

            <span>
                <i class="fa-regular fa-star"></i>
                ${repo.stargazers_count}
            </span>

            <span>
                <i class="fa-solid fa-code-fork"></i>
                ${repo.forks_count}
            </span>

        </div>

    </div>
    
`).join("")}

            <a class="github-btn" href="${data.html_url}" target="_blank">
                View GitHub Profile
            </a>
        `;
    }

        catch (error) {
        console.log(error);
        card.innerHTML = `<p>${error}</p>`;
    }
}

button.addEventListener("click", searchUser);

usernameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchUser();
    }
});