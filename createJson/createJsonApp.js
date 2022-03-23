//export { adsInDb };
const imgs = document.querySelectorAll("img"); //src
const h3Title = document.querySelectorAll("h3"); //innerHTML
const locs = document.querySelectorAll(".itemtile-location");
const prices = document.querySelectorAll(".itemtile-price");
const description =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
class Ad {
  constructor({
    id,
    title,
    description,
    imgSrc,
    location,
    price,
    isGift = false,
    isVB = false,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.location = location;
    this.price = price;
    this.isGift = isGift;
    this.isVB = isVB;
  }
}
function getStyledPrice(unstyledPrice) {
  switch (unstyledPrice.substring(unstyledPrice.length - 1)) {
    case "€":
      return Number(
        unstyledPrice
          .slice(0, unstyledPrice.length - 2)
          .split(".")
          .join(" ")
      );
    case "n":
      return 0;
    case "B":
      return 0;
  }
}
const isGift = (unstyledPrice) => {
  if (unstyledPrice.substring(unstyledPrice.length - 1) === "n") {
    return true;
  }
  return false;
};
const isVB = (unstyledPrice) => {
  if (unstyledPrice.substring(unstyledPrice.length - 1) === "B") {
    return true;
  }
  return false;
};
const adsInDb = [];
let allBigImgUrls = "";
imgs.forEach((img) => {
  allBigImgUrls += "\n" + img.src.replace("35", "59");
});
for (let i = 0; i < imgs.length; i++) {
  adsInDb.push(
    new Ad({
      id: i + 1,
      title: h3Title[i].innerHTML.slice(2).trim(),
      description: description,
      imgSrc: `/img/${i}.JPG`,
      location: locs[i].innerHTML,
      price: getStyledPrice(prices[i].innerHTML),
      isGift: isGift(prices[i].innerHTML),
      isVB: isVB(prices[i].innerHTML),
    })
  );
}

console.log(adsInDb);
console.log(allBigImgUrls);
