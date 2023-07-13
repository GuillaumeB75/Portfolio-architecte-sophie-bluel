const openModalV2 = function (e) {
    e.preventDefault();
    document.querySelector("#modal-delete-gallery").style.display = "none";
    document.querySelector("#modal-add-projet").style.display = "block";
  };
  
  document.querySelector("#btn-photo").addEventListener("click", openModalV2);
  
  const btnReturn = function (e) {
    e.preventDefault();
    document.querySelector("#modal-delete-gallery").style.display = "block";
    document.querySelector("#modal-add-projet").style.display = "none";
  };
  
  document.querySelector(".btn-return").addEventListener("click", btnReturn);
  document
    .querySelector(".js-modal-stop2")
    .addEventListener("click", stopPropagation);
  