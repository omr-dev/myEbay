//elements to update
const adTitleElem = document.getElementById("adTitle");
const adDescriptionElem = document.getElementById("adDescription");
const adLocationElem = document.getElementById("adLocation");
const adBigImgELem = document.getElementById("adBigImg");
const adPriceElem = document.getElementById("adPrice");

//get add id from index
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const adId = Number(params.id);

//get ad details from db
const db = new DB("./app/dbTable.json");

db.getAllAdsInDB().then((data) => {
  updateShowAdPage(data);
});

function updateShowAdPage(allAdsInDb) {
  allAdsInDb.forEach((ad) => {
    console.log(23, ad.id, adId);
    if (ad.id === adId) {
      adTitleElem.innerHTML = ad.title;
      adDescriptionElem.innerHTML = ad.description;
      adLocationElem.innerHTML =
        '<i class="fa-solid fa-location-dot"> ' + ad.location;
      adBigImgELem.src = `./img/big${adId - 1}.JPG`;
      adPriceElem.innerHTML = getPriceText(ad);
    }
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
console.log(adId);
