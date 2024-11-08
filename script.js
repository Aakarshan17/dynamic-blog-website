document.addEventListener("DOMContentLoaded", function() {
    const postList = document.getElementById("post-list");
    const postForm = document.getElementById("post-form");

    // get posts from local storage, if not there start with empty list
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // function to display posts
    function displayPosts() {
        if (postList) { // Check if postList exists before attempting to access it
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
    }

    displayPosts(); 

    if (postForm) { 
        postForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            // get form data
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            const image = document.getElementById("image").value;

            if (!title) {
                alert("Title is required.");
                return;
            }
            
            if (!content) {
                alert("Content is required.");
                return;
            }
            
            const newPost = { title, content, image };

            // add new post to posts array and update local storage
            posts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(posts));

            
            window.location.href = "index.html";
        });
    }

    
    const postContainer = document.getElementById("post-container"); 
    if (postContainer) { 
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('id'); 

        const postTitle = document.getElementById('post-title');
        const postContent = document.getElementById('post-content');
        const postImage = document.getElementById('post-image');
        const editButton = document.getElementById('edit-button');

        if (postId !== null) {
            const post = posts[postId]; 
            postTitle.textContent = post.title;
            postContent.textContent = post.content;
            postImage.src = post.image; // Set the image source

            editButton.addEventListener('click', function() {
               
                const titleInput = document.createElement('input');
                titleInput.type = 'text';
                titleInput.value = post.title; 

                const contentTextarea = document.createElement('textarea');
                contentTextarea.value = post.content; 

                
                postTitle.replaceWith(titleInput); 
                postContent.replaceWith(contentTextarea); 

                
                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save Changes';

               
                editButton.replaceWith(saveButton); 

                saveButton.addEventListener('click', function() {
                    
                    post.title = titleInput.value;
                    post.content = contentTextarea.value;

                    // Update local storage with the modified post
                    localStorage.setItem("posts", JSON.stringify(posts));

                   
                    titleInput.replaceWith(postTitle);  
                    contentTextarea.replaceWith(postContent); 
                    saveButton.replaceWith(editButton); 

                    // Update the text content of the title and content elements
                    postTitle.textContent = post.title; 
                    postContent.textContent = post.content; 
                });
            });
        } else {
            // Handle the case where the post ID is not found
            postTitle.textContent = "Post not found!"; 
        }
    }
});