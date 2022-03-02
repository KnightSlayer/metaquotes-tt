import './style.css'
import { renderRouter } from "./router";

const app = document.querySelector<HTMLDivElement>('#app')!;

renderRouter(app);
