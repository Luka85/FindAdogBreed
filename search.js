console.log("search");
import { catchError, showAllData } from "./data.js";
import { inputFocus, searchInput } from "./script.js";
import { toggleImage } from "./toggleImage.js";

// //*FETCH THE DATA BASED ON INPUT SEARCH AND INPUT VALIDATION and DISPLAY ALL THE RESULTS

export const searchBreed = async (searchInput, notification, resultDataUl) => {
  try {
    const resolve = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${searchInput.value}`
    );
    return resolve.data;
  } catch (error) {
    catchError(resultDataUl, notification, inputFocus);
    console.log(error);
  }
};

export const showSearchResults = function (
  searchInput,
  notification,
  resultDataUl
) {
  searchBreed(searchInput, notification, resultDataUl).then((resolve) => {
    console.log(resolve);
    resultDataUl.innerHTML = "";
    if (resolve.length === 0) {
      notification = document.createElement("li");
      notification.classList.add("notification");
      notification.textContent = "Nothing found. Please try again";
      resultDataUl.append(notification);
      inputFocus(searchInput);
    } else {
      for (let i = 0; i < resolve.length; i++) {
        const newLi = document.createElement("li");
        newLi.classList.add("result");
        newLi.innerHTML = `<div class="result__num">${
          i + 1
        }</div><div class ="result__breedLink">${
          resolve[i].name
        }</div><img class="hidden" src="https://cdn2.thedogapi.com/images/${
          resolve[i].reference_image_id
        }.jpg" alt="Image of the ${resolve[i].name}">`;
        resultDataUl.append(newLi);
        inputFocus(searchInput);
      }
    }
  });
};

export const inputValidation = function (
  searchInput,
  resultFetchBreed,
  notification,
  resultDataUl,
  newLi
) {
  if (
    searchInput.value.length === 0 ||
    searchInput.value === " " ||
    searchInput.value[0] <= 9
  ) {
    searchInput.value = "";
    inputFocus(searchInput);
    showAllData(resultFetchBreed, resultDataUl, newLi);
  } else {
    showSearchResults(searchInput, notification, resultDataUl);
  }
};
