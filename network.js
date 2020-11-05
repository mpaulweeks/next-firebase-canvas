let myId = Math.floor(Math.random() * 1000000);

let myRef = firebase.database().ref('user/' + myId);
// safely cleanup canvas after closing
myRef.onDisconnect().remove();
// update remove database every 3 seconds
setInterval(() => {
  myRef.set({
    id: myId,
    data: canvasToData(myCanvas),
  });
}, 3000);

let userRef = firebase.database().ref('user');
// read all other canvases once on pageload
userRef.once('value', (snapshot) => {
  let updates = Object.values(snapshot.val());
  updates.forEach((update) => {
    if (update.id !== myId) {
      updateRemoteCanvas(update.id, update.data);
    }
  });
});
// read when canvases are added/edited/removed
userRef.on('child_added', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== myId) {
    updateRemoteCanvas(update.id, update.data);
  }
});
userRef.on('child_changed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== myId) {
    updateRemoteCanvas(update.id, update.data);
  }
});
userRef.on('child_removed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== myId) {
    removeRemoteCanvas(update.id);
  }
});
