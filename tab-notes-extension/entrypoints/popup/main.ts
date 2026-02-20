import "./styles.css";

document.querySelector("#app")!.innerHTML = `
    <div class="sticky-note">
        <form class="note-form">
            <textarea id="note-text" placeholder="Write your note here"></textarea>
        </form>
    </div>
`;

const noteText =
  (document.getElementById("note-text") as HTMLTextAreaElement) || null;

if (noteText) {
  noteText.addEventListener(
    "focus",
    () => {
      if (noteText.value.trim() === "") {
        noteText.value = "";
      } else {
        noteText.value = noteText.value.replace(/^\s+|\s+$/g, "");
      }
    },
    { once: true },
  );
}
