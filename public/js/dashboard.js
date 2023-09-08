// New Post Button
const createBtn = document.querySelector("#btn-post");

// Dashboard container
const dashboardContainer = document.querySelector("#dashboard-container");

// Create container
const postContainer = document.querySelector("#post-container");

// Obtain user_id from the dataset on this element
const userData = document.querySelector("#greet");

// Edit & Delete container
const modContainer = document.querySelector("#modify-container");
const modTitle = document.querySelector("#mod-title");
const modContent = document.querySelector("#mod-content");
const modPost = document.querySelector("#modify-post");

// TOGGLE: Toggles the Dashboard and the Create Blog Post form
const togglePostForm = async () => {
  console.log('click')
  if (postContainer.classList.contains("hide")) {
    postContainer.classList.remove("hide");
    dashboardContainer.classList.add("hide");
  } else {
    postContainer.classList.add("hide");
    dashboardContainer.classList.remove("hide");
  }
};

// OPEN EDIT WINDOW: Allows users to edit the selected post's content.
const selectPost = async (event) => {
  const title = event.dataset.title;
  const content = event.dataset.content;

  modPost.dataset.id = event.dataset.id;

  modTitle.value = title;
  modContent.value = content;

  if (modContainer.classList.contains("hide")) {
    modContainer.classList.remove("hide");
    dashboardContainer.classList.add("hide");
    createBtn.classList.add("hide");
  } else {
    modContainer.classList.add("hide");
    dashboardContainer.classList.remove("hide");
    createBtn.classList.remove("hide");
  }
};

// CREATE: User creates a new blog post
const postFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the post form
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  const user_id = userData.dataset.user;

  if (title && content && user_id) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful reload the page
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// UPDATE: User updates an existing blog post
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#mod-title").value.trim();
  const content = document.querySelector("#mod-content").value.trim();

  const id = modPost.dataset.id;

  if (title && content && id) {
    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful reload the page
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// DELETE: User deletes an existing blog post
const deleteFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#mod-title").value.trim();
  const content = document.querySelector("#mod-content").value.trim();

  const id = modPost.dataset.id;

  if (title && content && id) {
    // Send a DELETE request to the API endpoint
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful reload the page
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

// Toggle Dashboard and Create Post screen.
document.querySelector("#btn-post").addEventListener("click", togglePostForm);
document.querySelector("#create-return").addEventListener("click", togglePostForm);

// Toggle Edit Post screen.
document.querySelector("#dash-posts").addEventListener("click", (event) => {
  if (event.target.classList.contains("select-post")) {
    selectPost(event.target);
  } else {
    return;
  }
});

// CREATE new post
document
  .querySelector("#submit-post")
  .addEventListener("submit", postFormHandler);
// UPDATE existing Post
document
  .querySelector("#update-post")
  .addEventListener("click", updateFormHandler);
// DELETE existing post
document
  .querySelector("#delete-post")
  .addEventListener("click", deleteFormHandler);
