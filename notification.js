const notificationsContainer = document.getElementById('notifications');
const unreadCountSpan = document.getElementById('unread-count');
const addMessageButton = document.getElementById('add-message');

let messageCounter = 1;
let unreadCount = 0;

function updateUnreadCount(change) {
  unreadCount += change;
  unreadCountSpan.textContent = unreadCount;
}

addMessageButton.addEventListener('click', () => {
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = `Message #${messageCounter++}`;
  notificationsContainer.appendChild(message);

  setTimeout(() => {
    if (message.parentNode) {
      if (message.classList.contains('highlight')) {
        updateUnreadCount(-1);
      }
      notificationsContainer.removeChild(message);
    }
  }, 10000);
});

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.classList && node.classList.contains('message')) {
        node.classList.add('highlight');
        updateUnreadCount(1);
        console.log('New message:', node.textContent);

        node.addEventListener('click', () => {
          if (node.classList.contains('highlight')) {
            node.classList.remove('highlight');
            updateUnreadCount(-1);
          }
        });
      }
    });
  });
});

observer.observe(notificationsContainer, {
  childList: true,
  subtree: false
});
