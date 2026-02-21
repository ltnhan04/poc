export default defineBackground(() => {
  browser.tabs.onActivated.addListener(async (activeTab) => {
    const tab = await browser.tabs.get(activeTab.tabId);
  });
});
