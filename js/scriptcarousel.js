//carousel variable by class name
var modals = document.getElementsByClassName("modal");
//use for to loop trough img
for(let i = 0; i < modals.length; i++) {
    let modal = modals[i];
    
    let img = document.getElementsByClassName("content-carousel")[0].getElementsByTagName("img")[i];
    let modalImg = document.getElementById("img" + i);
    let captionText = document.getElementsByClassName("caption")[i];
    //add inner to increase size on click
    img.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        captionText.innerHTML = this.alt;
    }
    //close button function
    let span = document.getElementsByClassName("closeb")[i];
    
    span.onclick = function () {
        modal.style.display = "none";
    }
}