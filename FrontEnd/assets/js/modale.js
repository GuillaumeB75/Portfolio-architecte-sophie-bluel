// -----------OUVERTURE DE LA MODALE --------
const openModal = function () {
  document.querySelector(".modale").style.display = "block";
  afficheWorksMini();
};
const modalElement = document.querySelector(".modale");

// Fonction pour fermer la modale
const closeModal = function () {
  modalElement.style.display = "none";
};

// Fonction pour empêcher la propagation d'un événement
const stopPropagation = function (e) {
  e.stopPropagation();
};

// Ajout d'un écouteur d'événement au bouton .btn-close
const btnClose = document.querySelectorAll(".btn-close");
btnClose.forEach(function (element) {
  element.addEventListener("click", closeModal);
});

document.querySelector(".btn-modifier2").addEventListener("click", openModal);
document
  .querySelector(".js-modal-stop")
  .addEventListener("click", stopPropagation);

// Ajout d'un écouteur d'événement à .modale pour fermer la modale
modalElement.addEventListener("click", function (e) {
  if (e.target === modalElement) {
    closeModal();
  }
});
  // -------- APPARITION DES PROJETS DE LA MODALE --------
  function afficheWorksMini() {
    const editGallery = document.querySelector("#edit-gallery");
    editGallery.innerHTML = "";
  
    for (let i = 0; i < listeTravaux.length; i++) {
      //Création des balises
      const projet = listeTravaux[i];
  
      const divElement = document.createElement("div");
      divElement.id = `modalItem${projet.id}`;  // Ajoutez cette ligne
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
    event.preventDefault();
    event.stopPropagation();
    console.log(id);
    const confirmDelete = confirm(
      "Êtes-vous sûr de bien vouloir supprimer ce projet ?"
    );
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
     
    
      if (response.status === 200 || response.status === 204) {
        const galleryItem = document.querySelector(`#galleryItem${id}`);
        if (galleryItem) {
            galleryItem.remove();
        }
        
        // Supprimez l'élément de la modale
        const modalItem = document.querySelector(`#modalItem${id}`);
        if (modalItem) {
            modalItem.remove();
        }
        listeTravaux = listeTravaux.filter((work) => work.id !== id);
       
    }
    }
  }