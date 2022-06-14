chrome.alarms.onAlarm.addListener((a) => {
    chrome.notifications.create(String(Date.now()), {
        type: 'basic',
        title: "Lespass Checking In!",
        message: "Time's up for your task!",
        priority: 2,
        iconUrl: ".\\unknown.png",
        eventTime: Date.now()
    })
})

chrome.tabs.onUpdated.addListener(
    function(details){
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            chrome.storage.local.get("urls", (result)=>{
                if (result["urls"].includes(url)){
                    chrome.storage.local.get("page", (page)=> {
                        if((page === "lespass") || (page === "urls")) {
                            chrome.tabs.update({url: './back_to_work.html'});
                        }
                    });
                }
            }
            )
            
        })
    }
)
