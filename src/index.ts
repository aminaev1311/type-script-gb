import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";
import { addDays, cloneDate } from "./flat-rent-sdk.js";
import { FlatRentSdk } from "./flat-rent-sdk.js";
import { Homy } from "./homy.js";
import { renderSearchResultsBlock } from "./search-results.js";

const flatSdk: FlatRentSdk = new FlatRentSdk();
const homySdk: Homy = new Homy();
const today = new Date();
let checkin = today;
let checkout = addDays(cloneDate(today), 2);

renderUserBlock(10);
renderSearchFormBlock(
  checkin.toISOString().split("T")[0],
  checkout.toISOString().split("T")[0]
);
renderSearchStubBlock();

const form = document.getElementById("searchForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form as HTMLFormElement);
  const price = formData.get("price");
  const checkin = formData.get("checkin");
  const checkout = formData.get("checkout");
  const homy = formData.get("homy");
  const flatRent = formData.get("flat-rent");

  console.log("form submitted: price, checkin, checkout, homy, flatRent", {
    price,
    checkin,
    checkout,
    homy,
    flatRent,
  });

  let hotels = [];
  const searchQuery = {
    city: "Санкт-Петербург",
    checkInDate: new Date(checkin as string),
    checkOutDate: new Date(checkout as string),
    priceLimit: price,
  };

  try {
    if (homy && !flatRent) {
      hotels = await homySdk.search(searchQuery);
    }

    if (flatRent && !homy) {
      hotels = await flatSdk.search(searchQuery);
    }

    if (homy && flatRent) {
      const hotelsHomy = await homySdk.search(searchQuery);
      const hotelsFlatRent = await flatSdk.search(searchQuery);
      hotels = [...hotelsHomy, ...hotelsFlatRent];
    }

    renderSearchResultsBlock(hotels);
    renderToast(
      {
        text: `${hotels.length} hotel(s) found!`,
        type: "success",
      },
      {
        name: "dismiss",
        handler: () => {
          console.log("Уведомление закрыто");
        },
      }
    );
  } catch (e) {
    renderToast(
      {
        text: e,
        type: "error",
      },
      {
        name: "Закрыть",
        handler: () => {
          console.log("Уведомление закрыто");
        },
      }
    );
  }
});

// sdk.get("mvm32l").then((flat) => {
//   console.log("flat by id", flat);
// });

// sdk
//   .search({ city: "Самара" })
//   .then(console.log)
//   .catch((result) => {
//     console.error("serach incorrect city", result);
//   });

// sdk.search({ city: "Санкт-Петербург" }).catch((result) => {
//   console.error("search without dates", result);
// });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: new Date(2021, 6, 26),
//   })
//   .catch((result) => {
//     console.error("search with only check-in date", result);
//   });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: addDays(cloneDate(today), -1),
//     checkOutDate: addDays(cloneDate(today), -6),
//   })
//   .catch((result) => {
//     console.error("search with check-in in the past", result);
//   });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: cloneDate(today),
//     checkOutDate: addDays(cloneDate(today), -6),
//   })
//   .catch((result) => {
//     console.error("serach with check-out date less than check-in", result);
//   });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: cloneDate(today),
//     checkOutDate: addDays(cloneDate(today), 1),
//   })
//   .then((result) => {
//     console.log("serach for one night", result);
//   });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: cloneDate(today),
//     checkOutDate: addDays(cloneDate(today), 2),
//   })
//   .then((result) => {
//     console.log("serach for two nights", result);
//   });

// sdk
//   .search({
//     city: "Санкт-Петербург",
//     checkInDate: cloneDate(today),
//     checkOutDate: addDays(cloneDate(today), 1),
//     priceLimit: 4500,
//   })
//   .then((result) => {
//     console.log("serach with price limit", result);
//   });

// sdk
//   .book("ab2e2", cloneDate(today), addDays(cloneDate(today), 2))
//   .then((result) => {
//     console.log("book flat", result);

//     sdk
//       .search({
//         city: "Санкт-Петербург",
//         checkInDate: cloneDate(today),
//         checkOutDate: addDays(cloneDate(today), 3),
//       })
//       .then((result) => {
//         console.log("serach after booking", result);
//       });
//   });

// sdk
//   .book("vnd331", addDays(cloneDate(today), 5), addDays(cloneDate(today), 6))
//   .then((result) => {
//     console.log("book flat", result);
//   });
