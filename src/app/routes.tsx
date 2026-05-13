import { createBrowserRouter } from "react-router";
import { Root } from "./components/root";
import { Home } from "./components/home";
import { FAQ } from "./components/faq";
import { Contact } from "./components/contact";
import { CVPage } from "./components/cv-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "cv", Component: CVPage },
      { path: "faq", Component: FAQ },
      { path: "contact", Component: Contact },
    ],
  },
]);
