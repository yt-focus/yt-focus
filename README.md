[![License][license-shield]](https://github.com/yt-focus/yt-focus/blob/main/LICENSE)





<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="https://user-images.githubusercontent.com/74576449/213616178-b79c0f8f-a0e5-44e8-82b8-070125ed201c.png" alt="Logo" width="500" height="auto">

  <h3 align="center">Learn Without All The Distractions</h3>

  <p align="center">
    A chrome extension for Youtube
</div>



<!-- ABOUT THE PROJECT -->
## 📜 Features (v1.1.0):
- Recommendation Blur
- Thumbnail Greyscale
- Video Brightness
- Video Blue Light Fliter
- Hide Comments, Recommendations, and Shorts
- lowercase titles to combat (CLICK-BAIT)
## 📝 Releases
- ## 🔗 [Download on the Chrome Web Store: v1.1.0](https://chrome.google.com/webstore/detail/yt-focus/fdekaebckbnpgafknooinjcnelmlhiip?hl=en&authuser=1) 🚀
- #### Pre-releases: [v1.1.0-pre.1](https://github.com/yt-focus/yt-focus/releases/tag/v1.1.0-pre.1) , [v1.0.0-beta](https://github.com/yt-focus/yt-focus/releases/tag/v1.0.0-beta)

## 💿 How to Run 
- `Clone or download` and `unzip` this project
- Go to the `puzzle piece` at the top of your chrome browser <img width="22" alt="image" src="https://user-images.githubusercontent.com/74576449/213809619-2dc469fb-4a67-45b9-afd0-8de747763b99.png">
then click `manage extensions`. 
- From that page go to the top right and enable `developer mode` then click `load unpacked` at the top left.
- Then select the `unzipped folder` (root folder) of the project and you should be good to go!
- `Don't forget` to click back on that puzzle piece <img width="22" alt="image" src="https://user-images.githubusercontent.com/74576449/213809619-2dc469fb-4a67-45b9-afd0-8de747763b99.png"> and pin it <img width="18" alt="image" src="https://user-images.githubusercontent.com/74576449/213835582-d0257d0d-4062-41ed-9e30-a2c17f17b06c.png">
 !
## 🔒 Privacy
#### Personal Data:
- YT-Focus respects the privacy of its users and is committed to protecting their personal information. We do not collect or retain any personal data, browsing history or other identifying information.
#### Third Party Services:
- YT-Focus uses Chrome (Chromium) or WebExtensions Storage Sync API to store user settings, and browser's Web Storage API (localStorage) to store Developer Tools fixes.
- Donations to YT-Focus are processed by Open Collective and their chosen payment processors, Stripe and PayPal.
## About The Project
What inspired the creation of this project was during my winter break where I was trying to get some extra studying in. When I went to YouTube I made it a habit to not look at my recommendation feed, and I would sometimes put my hand over it. I did this because I knew I would get distracted, and I would. Even with that habit, sometimes I'm tying, and then boom, out of the corner of my eye something so wild and absurd catches my interest, or I try my hardest to stay focused typing I forget what I was typing.

So I spent tha last week of my break learning how to create a chorme extension and grinded all the way through until I finished. I wanted to be done before school started, so I wouldn't have to think about it anymore, and so that I could use it.

## 🎨 Designed on Figma

</br>
<div align="center" class="pic">
<img width="203" alt="image" src="https://user-images.githubusercontent.com/74576449/215507956-a7411930-7d54-4db9-8afb-a815bd4c9981.png">
</div>

#### Here is the link to access the orginal figma files that were used to create this:
https://www.figma.com/file/eOkqXPaJOeN9cLC9SoLUUJ/YT-Focus?node-id=107%3A10&t=xtgtgf7jzVXLMOGl-1 

## 🔗 [Demo Video](https://youtu.be/TTm6PwH7StU) (v1.0.0)
# Distraction Free Homepage
[![homepage](https://user-images.githubusercontent.com/74576449/214985469-3e0021cb-c855-47f7-a727-bf90429310ec.png)](https://chrome.google.com/webstore/detail/yt-focus/fdekaebckbnpgafknooinjcnelmlhiip?hl=en&authuser=1)
# Less Jarring Search Results
[![search](https://user-images.githubusercontent.com/74576449/214985614-443376ac-3751-4e3c-931f-3c29511b172f.png)](https://chrome.google.com/webstore/detail/yt-focus/fdekaebckbnpgafknooinjcnelmlhiip?hl=en&authuser=1)
# Focus on Learning
[![video](https://user-images.githubusercontent.com/74576449/214985631-e27a69dd-5cdc-4788-b45c-37c8575a67f6.png)](https://chrome.google.com/webstore/detail/yt-focus/fdekaebckbnpgafknooinjcnelmlhiip?hl=en&authuser=1)
(screeshots from v1.1.0)

## 🖥️ Companion Website
This project also has a website (React.js)
- Link: https://yt-focus.org/ 
- Repo: https://github.com/yt-focus/yt-focus-website (issues open)

## Contributing
Before contributing there's some things you might wanna know. The basic structure:
- Most of the code is in `background.js` and `popup.js`.
- Messages from the chrome API wasn't working for me, so the basic flow goes as follows:
  - `popup.js` sets listeners on all the elements in `popup.html`
  - user makes an input
  - that input is saved in the chrome storage API
  - `background.js` listens for storage change
  - `background.js` makes runs code to apply styles
- styles are applied with `chrome.scripting.insertCSS` throughout `background.js`. You can see the main code for that at the top of `background.js` under the function `getStyles()`.
- there are two listeners in `background.js`, one for storage change and one for when the page changes (url).
A lot of refactoring can be done. This was my first chrome extension and I'm open to learn from others. 

# ❤️ Support This Project

There are a few things you can do to support the project:

- Leave a review on the Chrome Web Store ❤️
- Star the repository (and follow me on GitHub for more)
- Share and upvote on sites like Twitter, Reddit, Hacker News
- Report any bugs, glitches, or errors that you find
- Share any feedback you have!

These things motivate me to to keep sharing what I build, and let me know
that my work is appreciated! They also help me improve the
project. Thanks in advance!

- You can donate, but I'd rather the former. I code for pleasure, not for money.

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
