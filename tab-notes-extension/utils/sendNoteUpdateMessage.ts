import { NoteStorages } from "@/@types";
import { getPageKey } from "./getPageKey";

export const sendNoteUpdateMessage = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId);

  if (tab.url) {
    const noteStorages: NoteStorages =
      (await storage.getItem("sync:noteStorages")) ?? {};
    const key = getPageKey(tab.url);
    const storedNoteStorages = noteStorages[key];

    const message = {
      type: "noteUpdated",
      payload: {
        noteData: storedNoteStorages,
        key: key,
      },
    };

    await browser.tabs.sendMessage(tabId, message);
  }
};
