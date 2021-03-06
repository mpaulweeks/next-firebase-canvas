let manager = new CanvasManager();

// todo students do everything below

let myRef = firebase.database().ref('user/' + manager.myId);
let userRef = firebase.database().ref('user');

// safely cleanup canvas after closing
myRef.onDisconnect().remove();

// update remove database every 3 seconds
setInterval(() => {
  myRef.set(manager.getMyData());
}, 3000);

// read all other canvases once on pageload
userRef.once('value', (snapshot) => {
  let updates = Object.values(snapshot.val() || {});
  updates.forEach((update) => {
    manager.updateRemoteDisplay(update);
  });
});

// read when canvases are added/edited/removed
userRef.on('child_added', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== manager.myId) {
    manager.updateRemoteDisplay(update);
  }
});
userRef.on('child_changed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== manager.myId) {
    manager.updateRemoteDisplay(update);
  }
});
userRef.on('child_removed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== manager.myId) {
    manager.removeRemoteDisplay(update);
  }
});
