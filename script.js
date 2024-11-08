document.addEventListener("DOMContentLoaded", function() {
    const postList = document.getElementById("post-list");

    // get posts from local storage, if not there start with empty list
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // function to display posts
    function displayPosts() {
        postList.innerHTML = ""; // clear out old stuff first
        posts.forEach((post, index) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <a href="post.html?id=${index}">Read More</a>
            `;
            postList.appendChild(postElement);
        });
    }

    displayPosts();
});
