import Browser from "webextension-polyfill"

Browser.action.onClicked.addListener(() => {
  try {
    const targetUrl = Browser.runtime.getURL("tabs/App.html")

    Browser.tabs.query({ url: targetUrl }).then((tabs) => {
      if (tabs.length > 0) {
        // If the target URL is already open, update the existing tab's content
        Browser.tabs.update(tabs[0].id, { active: true })
      } else {
        // If the target URL is not open, create a new tab and load it
        Browser.tabs.create({ url: targetUrl })
      }
    })
  } catch (error) {
    // Handle errors
    // console.error(error);
  }
})
