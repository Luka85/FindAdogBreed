console.log("search");
import { catchError } from "./fetchData.js";

// //*FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION and DISPLAY ALL THE RESULTS

export const searchBreed = async (searchInput, resultDataUl, notification) => {
  searchInput = document.querySelector(".search__input");
  resultDataUl = document.querySelector("ul");
  notification = document.createElement("li");
  try {
    searchInput = document.querySelector(".search__input");

    const resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    const breedsData = resolve.data;
    console.log(breedsData);
    // return breedsData;
    resultDataUl.innerHTML = "";
    if (breedsData.length === 0) {
      searchInput.value = "";
      searchInput.focus();
      console.log("NULA");
    }

    for (let i = 0; i < breedsData.length; i++) {
      notification.style.display = "none";
      const newLi = document.createElement("li");
      newLi.classList.add("result");
      newLi.innerHTML = `<div class="result__num">${
        i + 1
      }</div><div class ="result__breedLink">${
        breedsData[i].name
      }</div><img class="hidden" src="https://cdn2.thedogapi.com/images/${
        breedsData[i].reference_image_id
      }.jpg" alt="Image of the ${breedsData[i].name}">`;

      resultDataUl.append(newLi);
    }

    notification.classList.add("notification");
    notification.textContent = "Nothing found. Please try again";
    resultDataUl.append(notification);
    searchInput.focus();
  } catch (error) {
    catchError();
    console.log(error);
  }
};
