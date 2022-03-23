export const pages = [
  {
    id: 1,
    idCode: "homePage",
    title: "Home",
    accessGroups: "loggedInUsers,loggedOutUsers",
  },
  {
    id: 2,
    idCode: "adsDetailsPage",
    title: "Details",
    accessGroups: "members,loggedOutUsers",
  },
  {
    id: 3,
    idCode: "adminPage",
    title: "Admin",
    accessGroups: "administrators",
  },
  {
    id: 4,
    idCode: "loginPage",
    title: "Login",
    accessGroups: "loggedOutUsers",
  },
  {
    id: 5,
    idCode: "registerPage",
    title: "Register",
    accessGroups: "loggedOutUsers",
  },
  {
    id: 6,
    idCode: "addAdPage",
    title: "AddAdPage",
    accessGroups: "loggedInUsers",
  },
];
