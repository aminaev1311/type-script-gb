import { renderBlock } from "./lib.js";
import { formatDate } from "./date-utils.js";

const today = new Date();
const todayString = formatDate(today);
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowString = formatDate(tomorrow);
const lastDayOfNextMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 2,
  0
);
const maxCheckInDate = formatDate(lastDayOfNextMonth);

const checkOutDate = new Date(today);
checkOutDate.setDate(checkOutDate.getDate() + 3);
const checkOutDateString = formatDate(checkOutDate);

const minCheckOutDate = new Date(today);
minCheckOutDate.setDate(minCheckOutDate.getDate() + 2);
const minCheckOutDateString = formatDate(minCheckOutDate);

export function renderSearchFormBlock(
  checkInDate?: string,
  checkOutDate?: string
): void {
  renderBlock(
    "search-form-block",
    `
    <form id="searchForm">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${tomorrowString}" min="${todayString}" max="${maxCheckInDate}" yes="2021-06-30" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOutDateString}" min="${minCheckOutDateString}" max="${maxCheckInDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
          <div id="display"></div>
        </div>
      </fieldset>
    </form>
    `
  );
}
