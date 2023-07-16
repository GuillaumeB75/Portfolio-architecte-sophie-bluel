function deconnection() {
  window.localStorage.clear("token");
  window.location.replace("index.html");
}

const isLoggedIn = localStorage.getItem("token");

const menuBouton = document.getElementById("menu-bouton");
const modeEdition = document.querySelector(".mode-edition");
const btnModifier1 = document.querySelector(".btn-modifier1");
const btnModifier2 = document.querySelector(".btn-modifier2");
const lienLogin = document.querySelector(".lien-login");
const lienLogout = document.querySelector(".lien-logout");

if (isLoggedIn) {
  menuBouton.style.display = "none";
  modeEdition.style.display = "flex";
  btnModifier1.style.display = "block";
  btnModifier2.style.display = "block";
  lienLogin.style.display = "none";
  lienLogout.style.display = "block";
  lienLogout.addEventListener("click", deconnection);
} else {
  modeEdition.style.display = "none";
  btnModifier1.style.display = "none";
  btnModifier2.style.display = "none";
  lienLogout.style.display = "none";
}
