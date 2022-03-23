import { users } from "./data/users.js";
import { pages } from "./data/pages.js";

//globals
let currentPageIdCode = "homePage";

//define elements
const navItemHomeElem = document.querySelector(".nav-link.home");
const navItemAddAdElem = document.querySelector(".nav-link.addAd");
const navItemLoginElem = document.querySelector(".nav-link.login");
const navItemRegisterElem = document.querySelector(".nav-link.register");
const navItemAdminElem = document.querySelector(".nav-link.admin");
const navItemDetailsElem = document.querySelector(".nav-link.details");

//set up elements
navItemHomeElem.addEventListener("click", function (e) {
  pageManager("homePage");
});
navItemAddAdElem.addEventListener("click", function (e) {
  pageManager("addAdPage");
});
navItemLoginElem.addEventListener("click", function (e) {
  pageManager("loginPage");
  //fieldLoginElem.focus();
});
navItemRegisterElem.addEventListener("click", function (e) {
  pageManager("registerPage");
});
navItemAdminElem.addEventListener("click", function (e) {
  pageManager("adminPage");
});
navItemDetailsElem.addEventListener("click", function (e) {
  pageManager("adsDetailsPage");
});

//NAV
const navItemElems = {
  homePage: navItemHomeElem,
  addAdPage: navItemAddAdElem,
  loginPage: navItemLoginElem,
  registerPage: navItemRegisterElem,
  adminPage: navItemAdminElem,
  adsDetailsPage: navItemDetailsElem,
};
const pageItems = pages.map((page) => {
  page.elem = document.querySelector(`div#${page.idCode}`);
  return page;
});

//general functions
const pageManager = (idCode) => {
  console.log("idCode", idCode);

  pageItems.forEach((pageItem) => {
    console.log(pageItem);
    pageItem.elem.style.display = "none";
  });
  pageItems.find((pageItem) => pageItem.idCode === idCode).elem.style.display =
    "block";
  // remove "active" class from all navElems
  Object.values(navItemElems).forEach((navItemElem) => {
    navItemElem.classList.remove("active");
  });
  // add "active" class to selected page navItem
  navItemElems[idCode].classList.add("active");
};

//PAGE LOAD
pageManager(currentPageIdCode);

//////////////////////////////////////////OLD CODES

// const db = new DB("./app/dbTable.json");
// const allAdsInDb = db.getAllAdsInDB().then((data) => {
//   updateUI(data);
// });

// const adsList = document.querySelector("#adsList");

// function updateUI(data) {
//   data.forEach((ad) => {
//     const newAdCard = `
//     <a href="showAdDetails.html?id=${ad.id}" class="cardLink">
//         <div class="card adCard" style="width: 18rem;">
//                 <img src="${ad.imgSrc}" class="card-img-top" alt="...">
//                 <div class="card-body">
//                     <h5 class="card-title">${ad.title}</h5>
//                     <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${
//                       ad.location
//                     }</p>
//                     <p class="card-text price-text">${getPriceText(ad)}</p>
//                 </div>
//             </div>
//             </a>
//         `;
//     adsList.innerHTML += newAdCard;
//   });
// }
// function getPriceText(ad) {
//   if (ad.price > 0) {
//     return ad.price + " €";
//   } else if (ad.isGift) {
//     return "Zu Verschenken";
//   } else if (ad.isVB) {
//     return "VB";
//   }
// }
