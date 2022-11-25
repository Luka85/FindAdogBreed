console.log("fetch");

export const fetchBreedData = async (resultData) => {
  try {
    const resolve = await axios.get(`https://api.thedogapi.com/v1/breeds/`);
    // console.log(resolve.data);
    return resolve.data;
  } catch (error) {
    const notification = document.createElement("li");
    notification.append(
      " Not found. Something went wrong. Please try again later"
    );
    resultData.append(notification);
  }
};

// //*GET THE VALUE FROM fetchBreedData FUNCTION
export const showAllData = function (fetchResult, resultData) {
  resultData.innerHTML = "";
  // const liArray = [];
  for (let i = 0; i < fetchResult.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add("result");
    newLi.innerHTML = `<div class="result__num">${
      i + 1
    }</div><div class ="result__breedLink">${
      fetchResult[i].name
    }</div><img class="hidden" src="${
      fetchResult[i].image.url
    }" alt="Image of the ${fetchResult[i].name}">`;
    resultData.append(newLi);
  }
};
