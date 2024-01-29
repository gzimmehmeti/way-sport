import { createRoot } from "react-dom/client";
import App from "./app";
function render() {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element not found in the HTML.");
  }
  createRoot(root).render(<App />);
}

render();
