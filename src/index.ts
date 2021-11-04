import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast, getUserData, getFavoritesAmount } from "./lib.js";

localStorage.setItem(
  "user",
  JSON.stringify({
    username: "Nathan Mianev",
    avatarUrl: "../img/avatar.png",
  })
);

localStorage.setItem("favoritesAmount", "11");

const { username, avatarUrl } = JSON.parse(getUserData("user"));
const favoritesAmount: number = +getFavoritesAmount("favoritesAmount");

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock(username, avatarUrl, favoritesAmount);
  renderSearchFormBlock("2021-06-30", "2021-06-30");
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );

  handleSearch();

  fetch("http://localhost:3000/places")
    .then((res) => res.json())
    .then((data) => console.log(data));
});

interface SearchFormData {
  checkIn: string;
  checkOut: string;
  maxPrice: number;
}

interface Place {}

function handleSearch(): SearchFormData {
  console.log("handleSearch");
  const searchData: SearchFormData = {
    checkIn: "",
    checkOut: "",
    maxPrice: 0,
  };
  const form = document.getElementById("searchForm");
  let formData = null;

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      formData = new FormData(form);
      searchData.checkIn = formData.get("checkin");
      searchData.checkOut = formData.get("checkout");
      searchData.maxPrice = formData.get("price");
      search(searchData);
      return searchData;
    });
  }
  return null;
}

function search(searchData: SearchFormData) {
  if (searchData != null) {
    console.log(searchData);
  }
}

// interface callback {
//   (error?: Error, places?: Place[]): Error | Place[];
// }

// function callback(error: Error, places: Place[]) {
//   const randomNumber = Math.random();
//   if (randomNumber > 0.5) {
//     return error;
//   }
//   return [];
// }

// function placeRequest(searchDate) {
//   return Promise.resolve();
// }
