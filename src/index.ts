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
});

interface SearchFormData {
  checkIn: string;
  checkOut: string;
  maxPrice: number;
}

export function handleSearch(): SearchFormData {
  const searchData: SearchFormData = null;
  const form = document.getElementById("searchForm");

  if (form instanceof HTMLFormElement) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      searchData.checkIn = "" + formData.get("checkin");
      searchData.checkOut = "" + formData.get("checkout");
      searchData.maxPrice = +formData.get("price");
    });
  }
  return searchData;
}

interface Place {
  data: [];
}

export function search(searchData: SearchFormData) {
  console.log(searchData);
}

search(handleSearch());
