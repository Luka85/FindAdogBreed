import { catchError, showAllData, addDataToHtml } from "./data.js";
import { inputFocus } from "./script.js";
console.log("search");
// //*FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION and DISPLAY ALL THE RESULTS

export const searchBreed = async (searchInput, notification, resultDataUl) => {
  try {
    const resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    return resolve.data;
  } catch (error) {
    catchError(resultDataUl, notification);
    console.log(error);
  }
};

export const showSearchResults = function (
  searchInput,
  notification,
  resultDataUl
) {
  searchBreed(searchInput, notification, resultDataUl).then((resolve) => {
    resultDataUl.innerHTML = "";
    if (resolve.length === 0) {
      notification = document.createElement("li");
      notification.classList.add("notification");
      notification.textContent = "Nothing found. Please try again";
      resultDataUl.append(notification);
      inputFocus();
    } else {
      return addDataToHtml(resolve);
    }
  });
};

export const inputValidation = function (
  searchInput,
  resultFetchBreed,
  notification,
  resultDataUl
) {
  if (
    searchInput.value.length === 0 ||
    searchInput.value === " " ||
    searchInput.value[0] <= 9
  ) {
    searchInput.value = "";
    inputFocus();
    showAllData(resultFetchBreed, resultDataUl);
  } else {
    showSearchResults(searchInput, notification, resultDataUl);
  }
};
