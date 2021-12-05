import { renderSearchFormBlock } from "./search-form.js";
import { renderSearchStubBlock } from "./search-results.js";
import { renderUserBlock } from "./user.js";
import { renderToast } from "./lib.js";
// import { FlatRentSdk } from "./flat-rent-sdk.js";
import { FlatRentSdk } from "./providers/flat-rent-sdk/flat-rent-sdk.js";

// import { Homy } from "./homy.js";
import { Homy } from "./providers/homy/homy.js";
import { renderSearchResultsBlock } from "./search-results.js";
import { Hotel } from "./hotel.js";
import { DatesHelper } from "./datesHelper.js";

const flatSdk: FlatRentSdk = new FlatRentSdk();
const homySdk: Homy = new Homy();
const today = new Date();
let checkin = today;
let checkout = DatesHelper.addDays(DatesHelper.cloneDate(today), 2);
let hotels: Hotel[] = [];

function sortByPriceAscending(one: Hotel, two: Hotel) {
  return one.totalPrice - two.totalPrice;
}

function sortByPriceDescending(one: Hotel, two: Hotel) {
  return two.totalPrice - one.totalPrice;
}

renderUserBlock(10);

renderSearchFormBlock(
  checkin.toISOString().split("T")[0]!,
  checkout.toISOString().split("T")[0]!
);

renderSearchStubBlock();

const form = document.getElementById("searchForm");

if (form) {
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

      hotels.sort(sortByPriceAscending);
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

      const select = document.getElementById("select");
      console.log(select);
      if (select) {
        select.addEventListener("change", (e) => {
          console.log("select changed");
          if (e.target instanceof HTMLSelectElement) {
            console.log(e.target.value);
            if (e.target.value === "cheap") {
              hotels.sort(sortByPriceAscending);
            } else {
              hotels.sort(sortByPriceDescending);
            }
            return renderSearchResultsBlock(hotels);
          }
        });
      }
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
}
