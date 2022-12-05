console.log("toggle");

//*TOGGLE IMAGES, IF A USER CLICKS ON ul(the closest li), IT SHOWS THE IMAGE, IF A USER CLICKS ANOTHER li, THE LAST ONE CHOSEN li HIDE THE IMAGE

export const toggleImage = function (e, allLi) {
  if (
    e.target.closest("li").lastElementChild.classList.contains("show-image")
  ) {
    e.target.closest("li").lastElementChild.classList.remove("show-image");
  } else {
    for (let i = 0; i < allLi.length; i++) {
      allLi[i].lastElementChild.classList.remove("show-image");
    }
    e.target.closest("li").lastElementChild.classList.add("show-image");
  }
};
