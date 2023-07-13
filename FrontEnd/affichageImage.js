const imageInput = document.querySelector("#ajouter-img");

imageInput.addEventListener("change", () => {
  const reader = new FileReader();
  
  reader.addEventListener("load", () => {
    document.querySelector(".div-img").style.backgroundImage = `url(${reader.result})`;
  });

  reader.readAsDataURL(imageInput.files[0]);
});
