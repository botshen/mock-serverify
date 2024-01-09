import Browser from "webextension-polyfill"

Browser.action.onClicked.addListener(() => {
  try {
    const targetUrl = Browser.runtime.getURL("tabs/App.html")

    Browser.tabs.query({ url: targetUrl }).then((tabs) => {
      if (tabs.length > 0) {
        Browser.tabs.update(tabs[0].id, { active: true })
      } else {
        Browser.tabs.create({ url: targetUrl })
      }
    })
  } catch (error) {
    console.error(error)
  }
})
