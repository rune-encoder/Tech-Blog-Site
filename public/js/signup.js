const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector("#user-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (!name || !password) {
    alert("Form must not be empty");
    return;
  }

  if (password.length < 10) {
    alert('Password must be at least 10 characters.')
    return
  }

  // Send a POST request to the API endpoint
  if (name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });
    // If successful, redirect the browser to the dashboard page
    if (response.ok) {
      console.log(response);
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// Click the Sign Up button
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
