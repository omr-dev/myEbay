import { users } from "../js/users.js";
import { pages } from "../js/pages.js";
const db = new DB("./app/dbTable.json");
const allAdsInDb = db.getAllAdsInDB().then((data) => {
  updateUI(data);
  console.log(3, data);
});

const adsList = document.querySelector("#adsList");

function updateUI(data) {
  data.forEach((ad) => {
    const newAdCard = `
    <a href="showAdDetails.html?id=${ad.id}" class="cardLink">
        <div class="card adCard" style="width: 18rem;">
                <img src="${ad.imgSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${ad.title}</h5>
                    <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${
                      ad.location
                    }</p>
                    <p class="card-text price-text">${getPriceText(ad)}</p>
                </div>
            </div>
            </a>
        `;
    adsList.innerHTML += newAdCard;
  });
}
function getPriceText(ad) {
  if (ad.price > 0) {
    return ad.price + " €";
  } else if (ad.isGift) {
    return "Zu Verschenken";
  } else if (ad.isVB) {
    return "VB";
  }
}
