import { catchError, showAllData, addDataToHtml } from "./data.js";
import { store } from "./store.js";
import { inputFocus } from "./script.js";
console.log("search");
// //*FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION and DISPLAY ALL THE RESULTS
const searchInput = document.querySelector(".search__input");
export const searchBreed = async (searchInput) => {
  try {
    const resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    store.setBreeds(resolve.data);
  } catch (error) {
    throw catchError();
  }
};

export const showSearchResults = async function () {
  await searchBreed(searchInput);
  const resultSearchBreed = store.getBreeds();
  const resultDataUl = document.querySelector("ul");
  resultDataUl.innerHTML = "";
  if (resultSearchBreed.length === 0) {
    const notification = document.createElement("li");
    notification.classList.add("notification");
    notification.textContent = "Nothing found. Please try again";
    resultDataUl.append(notification);
    inputFocus();
  } else {
    const result = addDataToHtml(resultSearchBreed);
    for (let i = 0; i < result.length; i++) {
      resultDataUl.appendChild(result[i]);
    }
  }
};

export const inputValidation = function () {
  const searchInput = document.querySelector(".search__input");
  if (
    searchInput.value.length === 0 ||
    searchInput.value === " " ||
    searchInput.value[0] <= 9
  ) {
    searchInput.value = "";
    inputFocus();
    showAllData();
  } else {
    showSearchResults();
  }
};
