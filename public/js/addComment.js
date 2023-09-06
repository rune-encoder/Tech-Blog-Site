const commentFormHandler = async (event) => {
  event.preventDefault();
  console.log("click ");

  // Comment Contents
  const content = document.querySelector("#comment").value.trim();

  // Commenting User's ID obtaining Data Attribute from HTML
  const user_id = document.querySelector("#comment").dataset.user;

  // Post ID obtained using the end of the URL.
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content && user_id && post_id) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, user_id, post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful reload page.
      location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
