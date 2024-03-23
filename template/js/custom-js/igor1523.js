window.openImage = function openImage(imageUrl) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("expandedImage");
  var captionText = document.getElementById("caption");
  modal.style.display = "block";
  modalImg.src = imageUrl;
  captionText.innerHTML = "Image";
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// Add an event listener for the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  var element = document.getElementsByClassName('payment__title');

  if (element.textContent.trim() === 'Assinatura') {
element[0].textContent = 'Assinatura no Boleto à Vista';
  }

  if (element.textContent.trim() === 'Assinatura') {
element[1].textContent = 'Assinatura no Cartão em 3x';
}
});
