import { storage } from "#imports";
import { NoteStorages } from "@/@types";

export const changeIcon = async (tabId: number) => {
  const tab = await browser.tabs.get(tabId);
  const noteStorages: NoteStorages =
    (await storage.getItem("sync:noteStorages")) ?? {};
  if (tab.url) {
    const key = getPageKey(tab.url);
    const storedNoteStorages = noteStorages[key];

    if (!storedNoteStorages) {
      browser.action.setIcon({
        path: {
          "16": "icon/16.png",
          "32": "icon/32.png",
          "48": "icon/48.png",
          "96": "icon/96.png",
          "128": "icon/128.png",
        },
      });
    } else {
      browser.action.setIcon({
        path: {
          "16": "icon-full/16.png",
          "32": "icon-full/32.png",
          "48": "icon-full/48.png",
          "96": "icon-full/96.png",
          "128": "icon-full/128.png",
        },
      });
    }
  }
};
