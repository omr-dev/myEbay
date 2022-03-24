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

const adsDetailsPageElem = document.querySelector("#adsDetailsPage");

//set up elements
navItemLoggedAsElem.addEventListener("click", function (e) {
  logOut();
  pageManager("homePage");
});
navItemHomeElem.addEventListener("click", function (e) {
  loadHomePage();
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

const loadHomePage = () => {
  (async () => {
    const response = await fetch("./js/data/dbTable.json");
    const adsInDb = await response.json();
    adsInDb.forEach((ad) => {
      adsList.innerHTML += createAdCard(ad);
    });
    addEventListenerToAllAdCards();
  })();
};
const addEventListenerToAllAdCards = () => {
  const allAdCards = document.querySelectorAll(".adCard");
  allAdCards.forEach((ad) => {
    ad.addEventListener("click", function (e) {
      const adId = Number(e.currentTarget.getAttribute("data-ad-id"));
      console.log(adId);
      showAdDetails(adId);
    });
  });
};
const createAdCard = (ad) => {
  return `
  
      <div class="card adCard" style="width: 18rem;" data-ad-id="${ad.id}">
              <img src="${ad.imgSrc}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${ad.title}</h5>
                  <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${
                    ad.location
                  }</p>
                  <p class="card-text price-text">${getPriceText(ad)}</p>
              </div>
          </div>
         
      `;
};
const getPriceText = (ad) => {
  if (ad.price > 0) {
    return ad.price + " €";
  } else if (ad.isGift) {
    return "Zu Verschenken";
  } else if (ad.isVB) {
    return "VB";
  }
};
const showAdDetails = (adId) => {
  loadAdDetails(adId);
  pageManager("adsDetailsPage");
};

const loadAdDetails = (adId) => {
  (async () => {
    const response = await fetch("./js/data/dbTable.json");
    const adsInDb = await response.json();
    let resultIdElem = "";
    adsInDb.forEach((ad) => {
      if (ad.id === adId) {
        console.log(180, ad.id, adId, ad.id === adId);
        adsDetailsPageElem.innerHTML = `<div class="row">
        <h3 class="bg-danger text-white" id="adTitle">${ad.title}</h3>
    </div>
    <div class="row">
        <div class="col-9 ">
            <div class="img-big-ad justify-content-end">
                <img src="img/big${
                  adId - 1
                }.JPG" class="img-fluid text-end" id="adBigImg">
                <div class="card d-flex flex-row justify-content-between p-3 ad-info-sub-img">
                    <h5 class="card-title bg-success text-white p-2" id="adPrice">${getPriceText(
                      ad
                    )}</h5>
                    <p class="card-text" id="adLocation">
                        <i class="fa-solid fa-location-dot"></i> ${ad.location}
                    </p>
                    <p class="card-text"><i class="fa-solid fa-calendar"></i> 21.03.2022</p>
                    <p class="card-text">
                        <i class="fa-solid fa-eye"></i> 54
                    </p>
                </div>
            </div>


            <div class="card ad-details p-3 m-3">
                <h5 class="card-title">Beschreibung</h5>
                <p class="card-text" id="adDescription">${ad.description}</p>
            </div>
        </div>
        <div class="col-3 d-flex flex-column gap-2">

            <div class="ad-action-buttons card gap-2 p-2">
                <button type="button" class="btn btn-primary"><i class="fa-solid fa-message"></i> Nachricht
                    schreiben</button>
                <button type="button" class="btn btn-primary"><i class="fa-solid fa-heart"></i> Zur Merkliste
                    hinzufügen</button>
                <button type="button" class="btn btn-primary"><i class="fa-solid fa-share"></i> Anzeige
                    teilen</button>

            </div>
            <div class="ad-owner card p-2">
                <div class="row">
                    <div class="col-3">
                        <img class="img-random-profile" src="./img/randomProfile.jpg">
                        <p class="ownerUserName text-center card-title">Max</p>
                    </div>
                    <div class="col-9 owner-details">

                        <p class="isFriendly"><i class="fa-solid fa-face-sunglasses"></i> Besonders freundlich
                        </p>
                        <p class="isConfident"><i class="fa-solid fa-star-sharp"></i> Besonders zuverlässig</p>
                        <p class="isCompany"><i class="fa-solid fa-person-circle-check"></i> Privater Nutzer</p>
                        <p class="activeSince">Aktiv seit 05.02.2017</p>
                        <div class="owner-sub-details row">

                            <p class="totalAds col">5 Anzeigen online</p>


                            <p class="follow col"> <button type="button" class="btn btn-primary "><i
                                        class="fa-solid fa-address-book"></i>
                                    Folgen</button></p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
      }
    });
  })();
};
//PAGE LOAD
pageManager(currentPageIdCode);
userManager(currentUser);
menuManager();
navItemHomeElem.click();
