import "./styles.css";

type NoteData = { note: string; createdAt: string; updatedAt: string };
type NoteStorages = {
  [key: string]: NoteData;
};

document.querySelector("#app")!.innerHTML = `
    <div class="sticky-note">
        <form class="note-form">
            <textarea id="note-text" placeholder="Write your note here"></textarea>
        </form>
    </div>
`;

const noteText = document.getElementById(
  "note-text",
) as HTMLTextAreaElement | null;

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

  const getPageKey = (url: string) => {
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname}`;
  };

  const storedNoteStorages = await browser.storage.sync.get("noteStorages");
  const noteStorages: NoteStorages =
    (storedNoteStorages.noteStorages as NoteStorages | undefined) ?? {};

  noteText.addEventListener("keyup", async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const pageKey = getPageKey(tab.url as string);
    const noteData: NoteData = {
      note: noteText.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    noteStorages[pageKey] = noteData;

    browser.storage.sync.set({ noteStorages }, () => {
      console.log("Value is set");
    });
  });
}
