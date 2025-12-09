let ticketCount = 0;
let activeTicket = null;
const tickets = {};

const header = document.getElementById("head");
const ticketList = document.getElementById("ticketList");
const chatWindow = document.getElementById("chatWindow");
const chatHeader = document.getElementById("chatHeader");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");

document.getElementById("addTicketBtn").onclick = () => {
    ticketCount++;
    const id = "ticket_" + ticketCount;
    tickets[id] = [];

    const ticketDiv = document.createElement("div");
    ticketDiv.className = "ticket";
    ticketDiv.textContent = "Ticket #" + ticketCount;
    ticketDiv.onclick = () => openTicket(id);

    ticketList.appendChild(ticketDiv);
};

function openTicket(id) {
    // https://www.w3schools.com/jsref/prop_screen_width.asp
    if (screen.width < 700) {
        header.style.height = 0;
    }
    chatInput.placeholder = "Type a message..."
    activeTicket = id;
    chatHeader.textContent = "Chat: " + id.replace("ticket_", "Ticket #");
    chatWindow.innerHTML = "";

    chatInput.disabled = false;
    sendBtn.disabled = false;

    for (const m of tickets[id]) {
        addMessage(m.text, m.sender);
    }
}

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "msg " + sender; // differentiate replies from messages
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendBtn.onclick = () => {
    const text = chatInput.value.trim();
    if (text === "" || !activeTicket) return; // probably should sanity check this

    tickets[activeTicket].push({ text, sender: "user" }); // this will be inlined in css
    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        const reply = "We will soon get back to you on the " + text;
        tickets[activeTicket].push({ text: reply, sender: "bot" }); // this will be inlined in css too
        addMessage(reply, "bot");
    }, 1000); // needs to feel like real convo with wait times
};

// TEMP: https://www.w3schools.com/jsref/event_onkeydown.asp
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
    }
});
