"use strict";

const searchInput = document.querySelector(".search__input");
const searchButton = document.querySelector(".search__button");
const result = document.querySelector("ul");

const getData = async () => {
  try {
    const resolve = await axios.get("https://api.thedogapi.com/v1/breeds");
    const data = resolve.data;
    for (let i = 0; i < data.length; i++) {
      const newLi = document.createElement("li");
      newLi.append(data[i].name);
      result.append(newLi);
    }
  } catch (error) {
    const notification = document.createElement("li");
    notification.append("Nothing found. Please try again");
    result.append(notification);
  }
};

window.addEventListener("load", getData);
