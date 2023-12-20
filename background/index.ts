/*global chrome*/

chrome.action.onClicked.addListener(() => {
  try {
    const targetUrl = chrome.runtime.getURL("tabs/delta-flyer.html")

    chrome.tabs.query({ url: targetUrl }, (tabs) => {
      console.log(
        "%c [ tabs ]-17",
        "font-size:13px; background:pink; color:#bf2c9f;",
        tabs
      )

      if (tabs.length > 0) {
        // If the target URL is already open, update the existing tab's content
        chrome.tabs.update(tabs[0].id, { active: true })
      } else {
        // If the target URL is not open, create a new tab and load it
        chrome.tabs.create({ url: targetUrl })
      }
    })
  } catch (error) {
    // Handle errors
    // console.error(error);
  }
})
