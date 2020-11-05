let myId = Math.floor(Math.random() * 1000000);
let myRef = firebase.database().ref('user/' + myId);

// safely cleanup canvas after closing
myRef.onDisconnect().remove();

setInterval(() => {
  myRef.set({
    id: myId,
    data: canvasToData(myCanvas),
  });
}, 3000);

firebase.database().ref('user').on('child_changed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== myId) {
    updateRemoteCanvas(update.id, update.data);
  }
});
