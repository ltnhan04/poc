import { storage } from "#imports";
import { NoteStorages } from "@/@types";
import { getPageKey } from "./getPageKey";

export const sendNoteUpdateMessage = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId);
  const noteStorages: NoteStorages =
    (await storage.getItem("sync:noteStorages")) ?? {};
  if (tab.url) {
    const key = getPageKey(tab.url);
    const storedNoteStorages = noteStorages[key];

    const message = {
      type: "noteUpdated",
      payload: {
        noteData: storedNoteStorages,
        key: key,
      },
    };

    browser.tabs.sendMessage(tabId, message);
  }
};
