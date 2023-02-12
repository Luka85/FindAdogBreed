import { inputFocus, resultDataUl } from "./script.js";
console.log("data");
//*FETCH THE BREED DATA FROM THE API
export const fetchBreedData = async (resultDataUl, notification) => {
  try {
    const resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    return resolve.data;
  } catch (error) {
    return catchError(resultDataUl, notification);
  }
};

export const catchError = function (resultDataUl, notification) {
  resultDataUl.innerHTML = "";
  notification = document.createElement("li");
  notification.classList.add("notification");
  notification.textContent =
    " Not found. Something went wrong. Please try again later";
  resultDataUl.append(notification);
  inputFocus();
};

//*CREATE AND DISPLAY li WITH THE FETCH DATA FROM resultFetchBreed
export const showAllData = function (resultFetchBreed, resultDataUl) {
  resultDataUl.innerHTML = "";
  if (resultFetchBreed === undefined) {
    console.log(`${resultFetchBreed} is undefined`);
  } else {
    return addDataToHtml(resultFetchBreed);
  }
};

export const clearData = function (searchInput) {
  inputFocus();
  searchInput.value = "";
};

export const addDataToHtml = function (fetchResults) {
  for (let i = 0; i < fetchResults.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("result");
    newLi.innerHTML = `<div class="result__num">${
      i + 1
    }</div><div class ="result__breedLink">${
      fetchResults[i].name
    }</div><img class="hidden" src="https://cdn2.thedogapi.com/images/${
      fetchResults[i].reference_image_id
    }.jpg
    " alt="Image of the ${fetchResults[i].name}">`;
    resultDataUl.append(newLi);
  }
};
