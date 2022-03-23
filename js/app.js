import { users } from "./data/users.js";
import { pages } from "./data/pages.js";

//globals
let currentPageIdCode = "homePage";
let currentUser = users.find((m) => m.login === "anonymous");

//define elements
const navItemLoggedAsElem = document.querySelector(".nav-link.loggedAs");
const navItemHomeElem = document.querySelector(".nav-item.homePage");
const navItemAddAdElem = document.querySelector(".nav-item.addAdPage");
const navItemLoginElem = document.querySelector(".nav-item.loginPage");
const navItemRegisterElem = document.querySelector(".nav-item.registerPage");
const navItemAdminElem = document.querySelector(".nav-item.adminPage");
const navItemDetailsElem = document.querySelector(".nav-item.adsDetailsPage");
const navItemNodeElems = document.querySelectorAll("nav .nav-item");

//set up elements
navItemLoggedAsElem.addEventListener("click", function (e) {
  pageManager("homePage");
  logOut();
});
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
  pageItems.forEach((pageItem) => {
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

const userManager = (user) => {
  if (user.login === "anonymous") {
    navItemLoggedAsElem.style.display = "none";
  } else {
    navItemLoggedAsElem.innerHTML = `angemeldet als: ${user.firstName} ${user.lastName} Ausloggen`;
    navItemLoggedAsElem.style.display = "block";
  }
};

function menuManager() {
  const navItems = Array.from(navItemNodeElems);

  navItems.forEach((navItem) => {
    const menuToPageRefId = navItem.className.split(" ")[1];

    if (
      !atLeastOneTermMatchesInLists(
        currentUser.accessGroups,
        getPageObj(menuToPageRefId).accessGroups
      )
    ) {
      navItem.style.display = "none";
    }
  });
}
const getPageObj = (pageIdCode) => {
  return pages.find((page) => page.idCode === pageIdCode);
};

const atLeastOneTermMatchesInLists = (list1, list2) => {
  const list1Terms = list1.split(",");
  const list2Terms = list2.split(",");
  for (const list1Term of list1Terms) {
    for (const list2Term of list2Terms) {
      if (list1Term == list2Term) {
        return true;
      }
    }
  }
  return false;
};
//PAGE LOAD
pageManager(currentPageIdCode);
userManager(currentUser);
menuManager();

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
