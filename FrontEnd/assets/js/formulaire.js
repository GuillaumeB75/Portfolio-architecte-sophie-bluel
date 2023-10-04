// -------- CREATION DU CHAMP SELECT CATEGORIE  -----
async function categoriesModale() {
  for (let index = 0; index < listeCategories.length; index++) {
    const category = listeCategories[index];

    const selectForm = document.querySelector("#form-categorie");

    const optionForm = document.createElement("option");
    optionForm.innerText = category.name;
    optionForm.value = category.id;
    selectForm.appendChild(optionForm);
  }
}

//--- FORMULAIRE ----
const imageElement = document.querySelector("#ajouter-img");
const titleElement = document.querySelector("#title");
const categoryElement = document.querySelector("#form-categorie");
const btnValider = document.querySelector("#btn-valider");
const msgErreur = document.querySelector(".message-erreur");
const msgOk = document.querySelector(".message-ok");

const form = document.querySelector("#form-projet");

form.addEventListener("change", function (e) {
  const ajoutImage = imageElement.value;
  const ajoutTitle = titleElement.value;
  const ajoutCategory = categoryElement.value;

  // toutes les conditions doivent être réunies

  if (!ajoutImage || !ajoutTitle || !ajoutCategory) {
    btnValider.classList.add("btn-disabled");
    btnValider.classList.remove("btn-enabled");
  } else {
    btnValider.classList.add("btn-enabled");
    btnValider.classList.remove("btn-disabled");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  //On les stock dans d'autre variable pour cibler la valeur saisie par l'utilisateur ou le fichier chargé
  const ajoutImage = imageElement.files[0];
  const ajoutTitle = titleElement.value;
  const ajoutCategory = categoryElement.value;

  if (!ajoutImage || !ajoutTitle || !ajoutCategory) {
    return (msgErreur.style.visibility = "visible");
  } else {
    msgErreur.style.visibility = "hidden";
  }

  // Vérifier la taille de l'image
if (ajoutImage.size > 4 * 1024 * 1024) {
  alert("La taille de l'image ne doit pas dépasser 4 Mo, saisissez une nouvelle image.");
  return;
}

const formData = new FormData(form);
console.log(formData);

const response = await fetch("http://localhost:5678/api/works", {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
  },
  body: formData,
});
const data = await response.json();
if (response.status === 201) {
  listeTravaux.push(data);
  afficheWorksMini();  // Mettez à jour la liste de travaux dans la modale
  
     const divGallery = document.querySelector(".gallery");
     const figureElement = document.createElement("figure");
     figureElement.id = `galleryItem${data.id}`;
     divGallery.appendChild(figureElement);
     const imageUrlElement = document.createElement("img");
     imageUrlElement.src = data.imageUrl;
     figureElement.appendChild(imageUrlElement);
     const titleElement = document.createElement("figcaption");
     titleElement.innerText = data.title;
     figureElement.appendChild(titleElement);

  // Réinitialisez le formulaire pour un nouvel ajout
  form.reset();
  document.querySelector(".div-img").style.backgroundImage = "";

  alert("L'image a bien été ajoutée.");
  return;
}
});


const imageInput = document.querySelector("#ajouter-img");

imageInput.addEventListener("change", () => {
const reader = new FileReader();

reader.addEventListener("load", () => {
  document.querySelector(".div-img").style.backgroundImage = `url(${reader.result})`;
});

reader.readAsDataURL(imageInput.files[0]);
});

