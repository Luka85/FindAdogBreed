import { inputFocus } from "./script.js";
console.log("data");
//*FETCH THE BREED DATA FROM THE API
export const fetchBreedData = async (
  resultDataUl,
  notification,
  searchInput
) => {
  try {
    const resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    return resolve.data;
  } catch (error) {
    catchError(resultDataUl, notification, searchInput);
  }
};

export const catchError = function (resultDataUl, notification, searchInput) {
  resultDataUl.innerHTML = "";
  notification = document.createElement("li");
  notification.classList.add("notification");
  notification.textContent =
    " Not found. Something went wrong. Please try again later";
  resultDataUl.append(notification);
  inputFocus(searchInput);
};

//*CREATE AND DISPLAY li WITH THE FETCH DATA FROM resultFetchBreed
export const showAllData = function (resultFetchBreed, resultDataUl, newLi) {
  resultDataUl.innerHTML = "";
  if (resultFetchBreed === undefined) {
  } else {
    for (let i = 0; i < resultFetchBreed.length; i++) {
      newLi = document.createElement("li");
      newLi.classList.add("result");
      newLi.innerHTML = `<div class="result__num">${
        i + 1
      }</div><div class ="result__breedLink">${
        resultFetchBreed[i].name
      }</div><img class="hidden" src="${
        resultFetchBreed[i].image.url
      }" alt="Image of the ${resultFetchBreed[i].name}">`;

      resultDataUl.append(newLi);
    }
  }
};

export const clearData = function (searchInput) {
  inputFocus();
  searchInput.value = "";
};
