import { changeIcon } from "@/utils";

export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async (activeTab) => {
    await changeIcon(activeTab.tabId);
  });

  browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
      await changeIcon(tabId);
    }
  });

  browser.tabs.onRemoved.addListener(async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab.id) {
      await changeIcon(tab.id);
    }
  });
});
