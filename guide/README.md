<style>
  p {
    text-align: center;
  }
  img {
    border: 5px solid grey;
    padding: 5px;
    width: 600px;
    height: auto;
  }
</style>

# Seting up Firebase

- Entry point: https://console.firebase.google.com/
- Pick any name for your project
- OK the analytics
- OK the terms
- Wait for project...

## Create firebase webapp to get access code

<p>
  <img src="pic1h.png" />
</p>

- Click `<>` to setup for web, say NO to hosting

<p>
  <img src="pic2h.png" />
</p>

- The name here doesn't matter. Make it different from your firebase name just to avoid confusion.

<p>
  <img src="pic3h.png" />
</p>

- Copy the entire blurb into your code! `index.html`, right above the script tags
- Still in your code, copy/paste analytics import and replace `firebase-analytics` with `firebase-database`

## Create firebase realtime database for storing our data

<p>
  <img src="pic4h.png" />
</p>

- Use right bar to select Realtime Database
- Click `Create Database` button
- Start in `test mode` and then enable!
