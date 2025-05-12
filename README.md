Chosen MutationObserverInit Config
{ childList: true, subtree: false }

childList: true – To detect when new .message elements are added to the #notifications container.
subtree: false – Because messages are direct children; we don’t have nested elements to watch.
