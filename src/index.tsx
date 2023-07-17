import React from "react";
import { createRoot } from "react-dom/client";
import { initializeDataLayer } from "./data/DataLayer";
import { store } from "./domain/DomainLayer";
import { initializePresentationLayer } from "./presentation/PresentationLayer";

initializeDataLayer();
const App = initializePresentationLayer(store);

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(<App />);
