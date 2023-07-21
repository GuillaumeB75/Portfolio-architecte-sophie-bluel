let listeCategories;

//Appel de l'API catégories
async function categories() {
  const response = await fetch("http://localhost:5678/api/categories");
  listeCategories = await response.json();
  console.log(listeCategories);
  categoriesModale();

  //parcours des catégories
  for (let index = 0; index < listeCategories.length; index++) {
    const category = listeCategories[index];

    //Création d'un élément bouton pour chaque catégorie
    const buttonElement = document.createElement("button");
    buttonElement.innerText = category.name;
    buttonElement.className = "button-category"; //Ajout d'une classe "button-category" pour chaque bouton (css)
    //Ajout du bouton à la div du menu
    divMenu.appendChild(buttonElement);

    //Ajout d'un écouteur d'évènement click pour filtrer les projets par catégorie
    buttonElement.addEventListener("click", () => {
      console.log(listeTravaux);
      //Filtrage des travaux par catégorie
      const travauxFiltres = listeTravaux.filter(function (work) {
        return work.categoryId === category.id;
      });
      //Affichage des travaux filtrés dans la galerie
      afficheWorks(travauxFiltres);
      console.log(travauxFiltres);
    });
  }
}

//appel de la fonction categories pour récupérer les catégories et afficher
categories();
