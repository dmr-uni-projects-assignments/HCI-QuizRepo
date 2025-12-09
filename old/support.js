let ticketCount = 0;
let activeTicket = null;
const tickets = {};

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
    activeTicket = id;
    chatHeader.textContent = "Chat: " + id.replace("ticket_", "Ticket #");
    chatWindow.innerHTML = "";

    chatInput.disabled = false;
    sendBtn.disabled = false;

    for (const m of tickets[id]) {
        addMessage(m);
    }
}

function addMessage(text) {
    const msg = document.createElement("div");
    msg.className = "msg";
    msg.textContent = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendBtn.onclick = () => {
    const text = chatInput.value.trim();

    tickets[activeTicket].push({ text});
    addMessage(text);
    chatInput.value = "";

    const reply = "We will soon get back to you on the " + text;
        tickets[activeTicket].push({ reply });
        addMessage(reply);
};