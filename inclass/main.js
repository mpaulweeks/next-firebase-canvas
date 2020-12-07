let manager = new CanvasManager();

// initialize database
let db = firebase.database();
let myRef = db.ref('users/' + manager.myId);

// whenever this tab closes, the db will erase myRef
myRef.onDisconnect().remove();

// set the db with our canvas every 3 seconds
setInterval(() => {
  myRef.set(manager.getMyData());
}, 1000);

// on load, get everyone's data once
db.ref('users').once('value', (snapshot) => {
  let users = snapshot.val();
  let updates = Object.values(users);
  for(let i = 0; i < updates.length; i++) {
    let update = updates[i];
    if (update.id !== manager.myId) {
      manager.updateRemoteDisplay(update);
    }
  }
});

// whenever users table is changed,
// grab the data and update our remote displays
db.ref('users').on('child_changed', (snapshot) => {
  let update = snapshot.val();
  if (update.id !== manager.myId) {
    manager.updateRemoteDisplay(update);
  }
});

// whenever a user is removed from the db,
// remove that display
db.ref('users').on('child_removed', (snapshot) => {
  let update = snapshot.val();
  // dont need to check if self,
  // because when would you see you delete yourself???
  manager.removeRemoteDisplay(update);
});
