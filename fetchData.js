console.log("fetch");

//*FETCH THE BREED DATA FROM THE API
export const fetchBreedData = async (resultDataUl) => {
  try {
    const resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    return resolve.data;
  } catch (error) {
    catchError(resultDataUl);
    console.log(error);
  }
};

export const catchError = function (resultDataUl, notification, searchInput) {
  searchInput = document.querySelector(".search__input");
  resultDataUl = document.querySelector("ul");
  resultDataUl.innerHTML = "";
  notification = document.createElement("li");
  notification.classList.add("notification");
  notification.textContent =
    " Not found. Something went wrong. Please try again later";
  resultDataUl.append(notification);
  searchInput.focus();
};

//*CREATE AND DISPLAY li WITH THE FETCH DATA FROM resultFetchBreed
export const showAllData = function (resultFetchBreed, resultDataUl) {
  resultDataUl.innerHTML = "";
  for (let i = 0; i < resultFetchBreed.length; i++) {
    const newLi = document.createElement("li");
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
};
