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
## 📝 Releases
- ### Chrome: [(pre-release) v1.0.0-beta](https://github.com/yt-focus/yt-focus/releases/tag/v1.0.0-beta)

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

## Designed on Figma
#### Here is the link to access the orginal figma files that were used to create this:

https://www.figma.com/file/eOkqXPaJOeN9cLC9SoLUUJ/YT-Focus?node-id=107%3A10&t=xtgtgf7jzVXLMOGl-1 

## Screenshots
![jomba (1)](https://user-images.githubusercontent.com/74576449/213811114-15bdc822-fa29-4fb4-808f-8c5da2a24fbf.png)
![joomba (1)](https://user-images.githubusercontent.com/74576449/213811132-3d7eac95-876d-42b6-a4e2-4cbffc11d790.png)
![hhhh (1)](https://user-images.githubusercontent.com/74576449/213811206-8fdc6b1e-fc23-4a65-972b-ea56ad282823.png)

## Companion Website
This project also has a website [React.js]
- Link: https://yt-focus.org/ 
- Repo: https://github.com/yt-focus/yt-focus-website (poorly maintained at the moment)
<img width="1280" alt="image" src="https://user-images.githubusercontent.com/74576449/213829186-f146f6ae-35ca-474c-b236-fcd319a9f698.png">


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
## [Demo Video](https://youtu.be/TTm6PwH7StU)
[![showcase](https://user-images.githubusercontent.com/74576449/213813113-4e1ef256-1f7e-4c8b-8213-dc9ee903ad58.png)](https://www.youtube.com/watch?v=TTm6PwH7StU)

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
