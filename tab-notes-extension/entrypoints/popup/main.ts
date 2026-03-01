import { storage } from "#imports";
import "./styles.css";
import { getPageKey, changeIcon } from "@/utils";
import { sendNoteUpdateMessage } from "@/utils/sendNoteUpdateMessage";
import { NoteData, NoteStorages } from "@/@types";

document.querySelector("#app")!.innerHTML = `
    <div class="sticky-note">
        <form class="note-form">
            <textarea id="note-text" placeholder="Write your note here"></textarea>
        </form>
    </div>
`;

const noteStorages: NoteStorages =
  (await storage.getItem("sync:noteStorages")) ?? {};

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

  noteText.addEventListener("keyup", async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.url && tab.id) {
      const pageKey = getPageKey(tab.url);
      if (noteText.value.trim() === "") {
        delete noteStorages[pageKey];
      } else {
        const noteData: NoteData = {
          note: noteText.value,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        noteStorages[pageKey] = noteData;
      }
      await storage.setItem("sync:noteStorages", noteStorages);
      changeIcon(tab.id);
      sendNoteUpdateMessage(tab.id);
    }
  });
}

const loadingExistingData = async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (tab.url) {
    const pageKey = getPageKey(tab.url);

    const storedNoteStorages = noteStorages[pageKey];
    if (storedNoteStorages) {
      noteText!.value = storedNoteStorages.note;
    }
  }
};

loadingExistingData();
