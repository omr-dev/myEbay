//export { adsInDb };
const imgs = document.querySelectorAll("img"); //src
const h3Title = document.querySelectorAll("h3"); //innerHTML
const locs = document.querySelectorAll(".itemtile-location");
const prices = document.querySelectorAll(".itemtile-price");
const description =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
class Ad {
  constructor(
    id,
    title,
    description,
    imgSrc,
    price,
    isGift = false,
    isVB = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.price = price;
    this.isGift = isGift;
    this.isVB = isVB;
  }
}
function getStyledPrice(unstyledPrice) {
  console.log(25, unstyledPrice);
  switch (unstyledPrice.substring(unstyledPrice.length - 1)) {
    case "€":
      return Number(unstyledPrice.slice(0, unstyledPrice.length - 2));
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
for (let i = 0; i < imgs.length; i++) {
  console.log(prices[i].innerHTML);
  adsInDb.push(
    new Ad(
      i + 1,
      h3Title[i].innerHTML.slice(2).trim(),
      description,
      `./img/adsImg/${i}.JPG`,
      getStyledPrice(prices[i].innerHTML),
      isGift(prices[i].innerHTML),
      isVB(prices[i].innerHTML)
    )
  );
}

console.log(adsInDb);
