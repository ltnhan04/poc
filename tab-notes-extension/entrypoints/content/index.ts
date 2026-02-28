import "./styles.css";
import { getPageKey } from "@/utils";

export default defineContentScript({
  matches: ["https://*/*"],
  main: function () {
    const showRibbon = () => {
      if (document.getElementById("tabnotes-ribbon")) return;
      const noteEl = document.createElement("div");
      noteEl.id = "tabnotes-ribbon";
      noteEl.textContent = "Note";
      document.body.appendChild(noteEl);
    };

    const hideRibbon = () => {
      document.getElementById("tabnotes-ribbon")?.remove();
    };

    const pageKey = getPageKey(window.location.href);

    browser.runtime.onMessage.addListener((message) => {
      if (message.type !== "noteUpdated" || message.payload.key !== pageKey) {
        return;
      }

      if (message.payload.noteData) {
        showRibbon();
      } else {
        hideRibbon();
      }
    });
  },
});
