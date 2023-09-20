const divGallery = document.querySelector(".gallery");
let listeTravaux;


//Appel de l'API works
async function works() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    listeTravaux = await response.json();
    console.log(listeTravaux);
    afficheWorks(listeTravaux);
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
  }
}

//Affichage des projets dans la gallery
function afficheWorks(projets) {
  //On vide le contenu de la galerie
  divGallery.innerHTML = "";

  //Parcours des projets
  for (let i = 0; i < projets.length; i++) {
    //Création des balises
    const projet = projets[i];

    //Création de l'élément figure
    const figureElement = document.createElement("figure");
    //Ajout de l'élément figure à la div de la galerie
    divGallery.appendChild(figureElement);

    //Création de l'élément img pour l'image du projet
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = projet.imageUrl;
    //Ajout de l'élément img à l'élément figure
    figureElement.appendChild(imageUrlElement);

    //Création de l'élément figcaption pour le titre du projet
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = projet.title;
    //Ajout de l'élément figcaption à l'élément figure
    figureElement.appendChild(titleElement);
  }
}
//Appel de la fonction works pour récupérer les projets et les afficher dans la gallerie
works();

//Selection de la div menu
const divMenu = document.querySelector("#menu-bouton");

//Selection du bouton "all" et ajout d'un ecouteur d'évènement click
const all = document.querySelector("#all");
all.addEventListener("click", () => {
  afficheWorks(listeTravaux);
});
