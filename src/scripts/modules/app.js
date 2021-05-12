import { h, render } from "preact";
import App from "../components/App";
import { ready } from "../global/helpers";

const appFuncs = (() => {
  const init = () => {
    try {
      renderComponents();
    } catch (e) {
      console.log(e);
    }
  };

  const renderComponents = () =>
    render(<App />, document.querySelector(".root"));

  return { init };
})();

ready(appFuncs.init());
