import "./styles.css";

export default defineContentScript({
  matches: ["https://*/*"],
  main: function () {
    const noteEl = document.createElement("div");
    noteEl.id = "tabnotes-ribbon";
    noteEl.textContent = "Note";
    document.body.appendChild(noteEl);
  },
});
