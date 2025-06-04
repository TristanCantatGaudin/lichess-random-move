# 🎲 Lichess Random Move Selector

This is a Chrome extension that adds a "Play Random Move" button to the [Lichess.org](https://lichess.org) analysis board.  
When clicked, it selects a move from the list of suggested moves **at random, weighted by the percentage next to each move** and plays it on the board.

---

## 📦 Features

- ✅ Works on the Lichess analysis board
- ✅ Adds a floating button to the bottom right of the page
- ✅ Randomly plays a move using the played percentages as weights


---

## 🔧 How to Install (in under 2 minutes)

1. **Download or clone this repository**  
   You can download it as a ZIP file by clicking the green "Code" button and selecting **"Download ZIP"**.

   (or alternatively: `git clone https://github.com/TristanCantatGaudin/lichess-random-move.git`)


2. **Unzip the folder**  
   Make sure the folder contains these files:

        manifest.json
        content.js
        README.md


3. **Open Google Chrome** and go to:  
`chrome://extensions`

4. **Enable Developer Mode**  
Toggle the switch in the top right corner.

5. **Click "Load unpacked"**  
Then select the folder where you unzipped the extension.

6. **Go to [Lichess.org](https://lichess.org)**  
Open the **analysis board** for any game (or click "Analysis board" from the game menu).

7. You will see a new button:  
➡️ **"Play Random Move 🎲"** in the bottom-right corner.

8. **Click the button**  
One of the suggested moves will be played automatically, chosen randomly based on the percentages.

---

## How it Works

- The extension reads the table of moves shown on the analysis board
- Each move has an associated percentage (like 65%, 20%, etc.)
- It picks a move randomly, but **moves with higher percentages are more likely to be chosen**

---


### Does this work during live games?
No, it only works on the **analysis board**, where move suggestions are visible. 

### Does it break Lichess rules?
No, it doesn’t automate gameplay or cheat. It only interacts with the analysis interface, like a user would, and does not access any information from outside the page.

---

## 🛠 Improvements?

The Lichess opening explorer rounds down percentage probabilities to 0% for rare moves, so our extension will never play them. We could calculate the percentage ourselves by reading the total number of times the position has been reached, and the number of times each move was played, both given in the table. 
