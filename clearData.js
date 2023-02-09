import { showAllData, resultFetchBreed } from "./fetchData.js";
import { inputFocus } from "./script.js";

export const clearData = function (searchInput, resultDataUl) {
  searchInput = document.querySelector(".search__input");
  resultDataUl = document.querySelector("ul");
  inputFocus(searchInput);
  inputFocus(searchInput);
  searchInput.value = "";
  showAllData(resultFetchBreed, resultDataUl);
};
