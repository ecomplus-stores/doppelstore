console.log('igor ta on');
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
