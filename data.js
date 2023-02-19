import { inputFocus } from "./script.js";
console.log("data");
//*FETCH THE BREED DATA FROM THE API
export const fetchBreedData = async () => {
  try {
    const resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    // console.log(resolve);

    return resolve.data;
  } catch (error) {
    throw catchError();
  }
};

export const catchError = function () {
  const resultDataUl = document.querySelector("ul");
  resultDataUl.innerHTML = "";
  const notification = document.createElement("li");
  notification.classList.add("notification");
  notification.textContent =
    " Not found. Something went wrong. Please try again later";
  resultDataUl.append(notification);
  inputFocus();
};

//*CREATE AND DISPLAY li WITH THE FETCH DATA FROM resultFetchBreed
export const showAllData = function (resultFetchBreed) {
  const resultDataUl = document.querySelector("ul");
  resultDataUl.innerHTML = "";
  // console.log(addDataToHtml(resultFetchBreed));
  const result = addDataToHtml(resultFetchBreed);
  for (let i = 0; i < result.length; i++) {
    resultDataUl.appendChild(result[i]);
  }
};

export const addDataToHtml = function (resultFetchBreed) {
  const listBreedsArray = [];
  for (let i = 0; i < resultFetchBreed.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("result");
    newLi.innerHTML = `<div class="result__num">${
      i + 1
    }</div><div class ="result__breedLink">${
      resultFetchBreed[i].name
    }</div><img class="hidden" src="https://cdn2.thedogapi.com/images/${
      resultFetchBreed[i].reference_image_id
    }.jpg
    " alt="Image of the ${resultFetchBreed[i].name}">`;
    listBreedsArray.push(newLi);
  }
  return listBreedsArray;
};

export const clearData = function () {
  const searchInput = document.querySelector(".search__input");
  inputFocus();
  searchInput.value = "";
};
