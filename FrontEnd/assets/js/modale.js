// -----------OUVERTURE DE LA MODALE --------
const openModal = function () {
    document.querySelector(".modale").style.display = "block";
    afficheWorksMini();
  };
  //Permet la propagation de l'evenement vers les parents
  const stopPropagation = function (event) {
    event.stopPropagation();
  };
  const closeModal = function () {
    document.querySelector(".modale").style.display = "none";
  };
  const btnClose = document.querySelectorAll(".btn-close");
  btnClose.forEach(function (element) {
    element.addEventListener("click", closeModal);
  });
  
  document.querySelector(".btn-modifier2").addEventListener("click", openModal);
  document
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  document.querySelector(".modale").addEventListener("click", closeModal);
  
  // -------- APPARITION DES PROJETS DE LA MODALE --------
  function afficheWorksMini() {
    const editGallery = document.querySelector("#edit-gallery");
    editGallery.innerHTML = "";
  
    for (let i = 0; i < listeTravaux.length; i++) {
      //Création des balises
      const projet = listeTravaux[i];
  
      const divElement = document.createElement("div");
      editGallery.appendChild(divElement);
      divElement.classList.add("premier-work");
      divElement.style.backgroundImage = `url(${projet.imageUrl})`;
  
      const divButtonElement = document.createElement("div");
      divElement.appendChild(divButtonElement);
      divButtonElement.classList.add("btn-work");
  
      const projectButtonElement = document.createElement("button");
      divButtonElement.appendChild(projectButtonElement);
      projectButtonElement.classList.add("btn-projet");
  
      const iconeEditer = document.createElement("i");
      projectButtonElement.appendChild(iconeEditer);
      iconeEditer.classList.add("fa-solid", "fa-arrows-up-down-left-right");
      iconeEditer.classList.add("icone-editer");
  
      const deleteButtonElement = document.createElement("button");
      divButtonElement.appendChild(deleteButtonElement);
      deleteButtonElement.classList.add("btn-delete");
      deleteButtonElement.addEventListener("click", (e) =>
        deletework(projet.id, e)
      );
  
      const iconeDelete = document.createElement("i");
      deleteButtonElement.appendChild(iconeDelete);
      iconeDelete.classList.add("fa-solid", "fa-trash-can", "fa-xs");
      iconeDelete.classList.add("icone-delete");
  
      const editButtonElement = document.createElement("button");
      divElement.appendChild(editButtonElement);
      editButtonElement.classList.add("btn-editer");
      editButtonElement.innerText = "éditer";
    }
  }
  
  async function deletework(id, event) {
    console.log(id);
    const confirmDelete = confirm(
      "Êtes-vous sûr de bien vouloir supprimer ce projet ?"
    );
    if (confirmDelete) {
      event.preventDefault();
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      const deleteResponse = await response.json();
      console.log(deleteResponse);
    }
  
    if (response.status === 200) {
      works();
      afficheWorksMini();
    }
  }
  