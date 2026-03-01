import { changeIcon } from "@/utils";
import { sendNoteUpdateMessage } from "@/utils/sendNoteUpdateMessage";

export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async (activeTab) => {
    changeIcon(activeTab.tabId);
    sendNoteUpdateMessage(activeTab.tabId);
  });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
      changeIcon(tabId);
      sendNoteUpdateMessage(tabId);
    }
  });

  browser.tabs.onRemoved.addListener(async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.id) {
      changeIcon(tab.id);
      sendNoteUpdateMessage(tab.id);
    }
  });
});
