const loginForm = document.querySelector("#login");

const token = window.localStorage.getItem("token");
if (token) {
  document.location.href = "index.html";
}

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("userId", data.userId);
    document.location.href = "index.html";
  } else if (response.status === 401) {
    alert("Email ou mot de passe incorrects");
  } else if (response.status === 404) {
    alert("Utilisateur non enregistré");
  }
});
