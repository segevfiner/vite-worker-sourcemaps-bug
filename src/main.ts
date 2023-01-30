import { createApp } from "vue";
import App from "./App.vue";
import MyWorker from "./worker?worker";

import "./assets/main.css";

const worker = new MyWorker();

createApp(App).mount("#app");
