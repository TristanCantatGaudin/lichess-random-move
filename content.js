function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const el = document.querySelector(selector);
        if (el) return resolve(el);

        const timer = setTimeout(() => reject(new Error('Timeout waiting for ' + selector)), timeout);
        const observer = new MutationObserver(() => {
            const found = document.querySelector(selector);
            if (found) {
                clearTimeout(timer);
                observer.disconnect();
                resolve(found);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}

function weightedRandomIndex(weights) {
    const total = weights.reduce((sum, w) => sum + w, 0);
    const r = Math.random() * total;
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
        sum += weights[i];
        if (r <= sum) return i;
    }
    return weights.length - 1; // fallback
}

function addRandomMoveButton() {
    if (document.getElementById("random-move-btn")) return;

    const button = document.createElement("button");
    button.textContent = "Play Random Move 🎲";
    button.id = "random-move-btn";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.zIndex = 1000;
    button.style.padding = "10px";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#00a";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";

    document.body.appendChild(button);

    button.addEventListener("click", () => {
        const allRows = Array.from(document.querySelectorAll("div.data table.moves tbody tr"));
        const rows = allRows.slice(0, -1); // drop the last row
        console.log("🔍 Found rows:", rows.length);

        if (rows.length === 0) {
            alert("No moves found!");
            return;
        }

        const parsed = rows.map(row => {
            const cells = row.querySelectorAll("td");
            let weight = 1;

            if (cells.length >= 2) {
                const text = cells[1].textContent.trim();
                const match = text.match(/(\d+)%?/);
                if (match) {
                    weight = parseFloat(match[1]);
                }
            }

            return { row, weight };
        });

        console.log("🎯 Parsed weights:", parsed.map(p => p.weight));

        const weights = parsed.map(p => p.weight);
        const index = weightedRandomIndex(weights);

        const cellToClick = parsed[index].row.querySelector("td");
        if (cellToClick) {
            console.log("✅ Clicking move:", cellToClick.textContent.trim());
            cellToClick.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        } else {
            alert("Could not click the move.");
        }
    });
}

// Wait for the move table to appear before injecting the button
waitForElement("div.data table.moves").then(addRandomMoveButton).catch(console.error);
