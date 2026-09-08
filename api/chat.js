<script>

let chatHistory = [];
let currentSessionId = Date.now().toString();
let attachedPhotoData = null;
let liveSpeechRecognition = null;
let isLiveOpen = false;

let activeDomain = null;
let activeSubdomain = null;


/* =========================================================
   MASTER MIND AI — UNIVERSAL STATE
   ========================================================= */

const MM = {
    appName: "MasterMind AI",
    version: "Universal Super App",
    totalDomains: 86,

    language: "auto",

    modes: {
        chat: true,
        specialist: true,
        autoRouter: true,
        image: true,
        voice: true,
        create: true
    },

    currentMode: "chat"
};


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function safeText(value) {
    return String(value ?? "").trim();
}


function getElement(id) {
    return document.getElementById(id);
}


function showElement(id) {
    const el = getElement(id);
    if (el) el.style.display = "";
}


function hideElement(id) {
    const el = getElement(id);
    if (el) el.style.display = "none";
}


/* =========================================================
   LOCAL CHAT HISTORY
   ========================================================= */

function loadChatHistory() {
    try {
        chatHistory = JSON.parse(
            localStorage.getItem("mm_chat_history") || "[]"
        );

        if (!Array.isArray(chatHistory)) {
            chatHistory = [];
        }
    } catch (error) {
        chatHistory = [];
    }
}


function saveChatHistory() {
    try {
        localStorage.setItem(
            "mm_chat_history",
            JSON.stringify(chatHistory)
        );
    } catch (error) {
        console.warn("Unable to save chat history", error);
    }
}


function addChatHistory(userText, aiText) {
    chatHistory.push({
        id: Date.now(),
        sessionId: currentSessionId,
        q: userText,
        a: aiText,
        domain: activeDomain?.name || null,
        specialist: activeSubdomain?.name || null,
        createdAt: new Date().toISOString()
    });

    saveChatHistory();
}


/* =========================================================
   SESSION
   ========================================================= */

function startNewSession() {
    currentSessionId = Date.now().toString();

    const container = getElement("chatContainer");

    if (container) {
        container.innerHTML = "";
    }

    chatHistory = [];
    activeDomain = null;
    activeSubdomain = null;

    attachedPhotoData = null;

    const photoPreview = getElement("photoPreview");
    if (photoPreview) {
        photoPreview.innerHTML = "";
        photoPreview.style.display = "none";
    }

    const input = getElement("userInput");
    if (input) {
        input.value = "";
        input.focus();
    }

    renderWelcomeScreen();
}


/* =========================================================
   WELCOME SCREEN
   ========================================================= */

function renderWelcomeScreen() {

    const container = getElement("chatContainer");

    if (!container) return;

    container.innerHTML = `
        <div class="welcome-screen">

            <div class="welcome-logo">
                ✦
            </div>

            <h1>
                MasterMind AI
            </h1>

            <p>
                Universal Intelligence • 86 Domains •
                1000+ Specialist Areas
            </p>

            <div class="welcome-actions">

                <button
                    class="welcome-action"
                    onclick="openHub()">
                    🌐 Explore 86 Domains
                </button>

                <button
                    class="welcome-action"
                    onclick="openAutoRouter()">
                    🔎 I Don't Know Where This Belongs
                </button>

            </div>

        </div>
    `;
}


/* =========================================================
   DOMAIN SEARCH
   ========================================================= */

function filterDomains(query) {

    const q = safeText(query).toLowerCase();

    if (!q) {
        renderHub(domainList);
        return;
    }

    const filtered = domainList.filter(domain => {

        const domainText = [
            domain.name,
            domain.desc,
            ...(domain.subdomains || []).map(x => x.name),
            ...(domain.subdomains || []).map(x => x.desc)
        ]
        .join(" ")
        .toLowerCase();

        return domainText.includes(q);
    });

    renderHub(filtered);
}


/* =========================================================
   DOMAIN HUB
   ========================================================= */

function renderHub(list) {

    const grid = getElement("domainGrid");

    if (!grid) return;

    if (!Array.isArray(list) || !list.length) {

        grid.innerHTML = `
            <div class="empty-state">
                <div style="font-size:40px">🔎</div>
                <h3>No matching domain</h3>
                <p>
                    Try another keyword or use Auto Router.
                </p>
            </div>
        `;

        return;
    }

    grid.innerHTML = list.map((domain) => {

        const originalIndex = domainList.indexOf(domain);

        return `
            <div
                class="domain-card"
                onclick="openSubdomains(${originalIndex})">

                <div class="domain-icon">
                    ${domainLogo(domain, originalIndex)}
                </div>

                <div class="domain-card-content">

                    <div class="domain-number">
                        DOMAIN ${originalIndex + 1}
                    </div>

                    <div class="domain-name">
                        ${escapeHtml(domain.name)}
                    </div>

                    <div class="domain-desc">
                        ${escapeHtml(domain.desc || "")}
                    </div>

                    <div class="domain-footer">
                        <span>
                            ${(domain.subdomains || []).length}
                            Specialists
                        </span>

                        <span class="domain-arrow">
                            →
                        </span>
                    </div>

                </div>

            </div>
        `;
    }).join("");
}


/* =========================================================
   DOMAIN LOGO
   ========================================================= */

function domainLogo(domain, index) {

    const emoji = domain?.icon || "✦";

    const gradients = [
        ["#6366f1", "#8b5cf6"],
        ["#06b6d4", "#3b82f6"],
        ["#ec4899", "#8b5cf6"],
        ["#22c55e", "#14b8a6"],
        ["#f59e0b", "#ef4444"],
        ["#3b82f6", "#6366f1"],
        ["#a855f7", "#ec4899"],
        ["#14b8a6", "#06b6d4"],
        ["#f97316", "#eab308"],
        ["#ef4444", "#f43f5e"],
        ["#10b981", "#06b6d4"],
        ["#8b5cf6", "#6366f1"]
    ];

    const pair = gradients[index % gradients.length];

    return `
        <div
            class="domain-logo-svg"
            style="
                background:
                linear-gradient(
                    135deg,
                    ${pair[0]},
                    ${pair[1]}
                );
            "
        >
            ${emoji}
        </div>
    `;
}


/* =========================================================
   DOMAIN THEMES
   ========================================================= */

function domainTheme(index) {

    const themes = [
        ["#6366f1", "#8b5cf6"],
        ["#0ea5e9", "#06b6d4"],
        ["#ec4899", "#a855f7"],
        ["#22c55e", "#14b8a6"],
        ["#f59e0b", "#f97316"],
        ["#3b82f6", "#6366f1"],
        ["#a855f7", "#ec4899"],
        ["#14b8a6", "#0ea5e9"],
        ["#f97316", "#ef4444"],
        ["#ef4444", "#ec4899"],
        ["#10b981", "#06b6d4"],
        ["#8b5cf6", "#3b82f6"]
    ];

    return themes[index % themes.length];
}


/* =========================================================
   SPECIALIST LOGO GENERATOR
   ========================================================= */

function hashCode(text) {

    let hash = 0;

    const value = String(text || "");

    for (let i = 0; i < value.length; i++) {
        hash =
            ((hash << 5) - hash) +
            value.charCodeAt(i);

        hash |= 0;
    }

    return Math.abs(hash);
}


function specialistLogo(name, domainIndex, subIndex) {

    const [c1, c2] = domainTheme(domainIndex);

    const hash =
        hashCode(name) +
        domainIndex * 97 +
        subIndex * 31;

    const styles = [
        "◆",
        "✦",
        "✧",
        "⬢",
        "◈",
        "✹",
        "✺",
        "✷",
        "◇",
        "●",
        "▲",
        "■"
    ];

    const symbol =
        styles[hash % styles.length];

    const initials = String(name || "AI")
        .replace(/[^A-Za-z0-9]/g, " ")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2) || "AI";

    return `
        <div
            class="specialist-logo"
            style="
                --spec-c1:${c1};
                --spec-c2:${c2};
            "
        >

            <div class="specialist-logo-symbol">
                ${symbol}
            </div>

            <div class="specialist-logo-text">
                ${escapeHtml(initials)}
            </div>

        </div>
    `;
}


/* =========================================================
   OPEN DOMAIN
   ========================================================= */

function openHub() {

    closeAll();

    const backdrop =
        getElement("modalBackdrop");

    const popup =
        getElement("modalPopup");

    const subPopup =
        getElement("subdomainPopup");

    if (subPopup) {
        subPopup.style.display = "none";
        subPopup.classList.remove("open");
    }

    if (popup) {
        popup.style.display = "flex";
        popup.classList.add("open");
    }

    if (backdrop) {
        backdrop.classList.add("open");
    }

    renderHub(domainList);
}


/* =========================================================
   OPEN SPECIALISTS
   ========================================================= */

function openSubdomains(index) {

    const domain = domainList[index];

    if (!domain) return;

    activeDomain = domain;
    activeSubdomain = null;

    const specialistAreas =
        Array.isArray(domain.subdomains) &&
        domain.subdomains.length
            ? domain.subdomains
            : [
                {
                    icon: "🧠",
                    name:
                        domain.name +
                        " — General Specialist",
                    desc:
                        "General specialist assistant for this domain",
                    parent: domain.name
                }
            ];

    const [c1, c2] =
        domainTheme(index);

    const title =
        getElement("subdomainTitle");

    const desc =
        getElement("subdomainDesc");

    const grid =
        getElement("subdomainGrid");

    if (title) {
        title.innerText =
            "✦ " + domain.name;
    }

    if (desc) {
        desc.innerText =
            domain.desc || "";
    }

    if (grid) {

        grid.innerHTML =
            specialistAreas.map((sub, i) => `

                <div
                    class="specialist-card"
                    style="
                        --dc1:${c1};
                        --dc2:${c2};
                    "
                    onclick="
                        pickSubdomain(
                            ${index},
                            ${i}
                        )
                    "
                >

                    <div class="spec-icon">
                        ${specialistLogo(
                            sub.name,
                            index,
                            i
                        )}
                    </div>

                    <div class="spec-name">
                        ${escapeHtml(
                            sub.name
                        )}
                    </div>

                    <div class="spec-desc">
                        ${escapeHtml(
                            sub.desc ||
                            "Specialist workspace for this area"
                        )}
                    </div>

                    <div class="spec-action">
                        Start Specialist Chat
                        <span>→</span>
                    </div>

                </div>

            `).join("");
    }

    const modal =
        getElement("modalPopup");

    const subPopup =
        getElement("subdomainPopup");

    if (modal) {
        modal.style.display = "none";
        modal.classList.remove("open");
    }

    if (subPopup) {
        subPopup.style.display = "flex";
        subPopup.classList.add("open");
    }
}


/* =========================================================
   CLOSE ALL PANELS
   ========================================================= */

function closeAll() {

    const ids = [
        "modalPopup",
        "subdomainPopup",
        "leftDrawer",
        "rightDrawer",
        "channelSelectPopup",
        "billingPopup"
    ];

    ids.forEach(id => {

        const el = getElement(id);

        if (!el) return;

        el.classList.remove("open");

        if (
            id === "modalPopup" ||
            id === "subdomainPopup"
        ) {
            el.style.display = "none";
        }
    });

    const backdrop =
        getElement("modalBackdrop");

    if (backdrop) {
        backdrop.classList.remove("open");
    }
}


/* =========================================================
   LEFT DRAWER
   ========================================================= */

function openLeftDrawer() {

    closeAll();

    const backdrop =
        getElement("modalBackdrop");

    const drawer =
        getElement("leftDrawer");

    if (backdrop) {
        backdrop.classList.add("open");
    }

    if (drawer) {
        drawer.classList.add("open");
    }
}


/* =========================================================
   RIGHT DRAWER / HISTORY
   ========================================================= */

function openRightDrawer() {

    closeAll();

    renderHistoryList();

    const backdrop =
        getElement("modalBackdrop");

    const drawer =
        getElement("rightDrawer");

    if (backdrop) {
        backdrop.classList.add("open");
    }

    if (drawer) {
        drawer.classList.add("open");
    }
}


/* =========================================================
   BILLING
   ========================================================= */

function openBilling() {

    closeAll();

    const backdrop =
        getElement("modalBackdrop");

    const popup =
        getElement("billingPopup");

    if (backdrop) {
        backdrop.classList.add("open");
    }

    if (popup) {
        popup.classList.add("open");
    }
}


/* =========================================================
   HISTORY LIST
   ========================================================= */

function renderHistoryList(query = "") {

    const listEl =
        getElement("historyList");

    if (!listEl) return;

    let history = [];

    try {
        history = JSON.parse(
            localStorage.getItem(
                "mm_chat_history"
            ) || "[]"
        );
    } catch {
        history = [];
    }

    if (!Array.isArray(history)) {
        history = [];
    }

    const q =
        safeText(query).toLowerCase();

    const filtered =
        q
            ? history.filter(item =>
                String(item.q || "")
                    .toLowerCase()
                    .includes(q)
              )
            : history;

    if (!filtered.length) {

        listEl.innerHTML = `
            <div class="empty-state">
                <div style="font-size:36px">
                    💬
                </div>
                <p>
                    No chat history yet.
                </p>
            </div>
        `;

        return;
    }

    listEl.innerHTML =
        filtered
            .slice()
            .reverse()
            .map((h, i) => {

                const originalIndex =
                    history.indexOf(h);

                return `
                    <div
                        class="history-item"
                        onclick="
                            quickPrompt(
                                '${String(h.q || "")
                                    .replace(/\\/g, "\\\\")
                                    .replace(/'/g, "\\'")}'
                            )
                        "
                    >

                        <span
                            style="
                                overflow:hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap;
                                max-width:180px;
                            "
                        >
                            💬
                            ${escapeHtml(h.q)}
                        </span>

                        <button
                            class="history-del-btn"
                            onclick="
                                event.stopPropagation();
                                deleteHistoryItem(
                                    ${originalIndex}
                                )
                            "
                        >
                            🗑️
                        </button>

                    </div>
                `;
            })
            .join("");
}


function filterChatHistory() {

    const input =
        getElement("historySearchInput");

    renderHistoryList(
        input ? input.value : ""
    );
}


function deleteHistoryItem(index) {

    let history = [];

    try {
        history = JSON.parse(
            localStorage.getItem(
                "mm_chat_history"
            ) || "[]"
        );
    } catch {
        history = [];
    }

    if (!Array.isArray(history)) {
        history = [];
    }

    history.splice(index, 1);

    localStorage.setItem(
        "mm_chat_history",
        JSON.stringify(history)
    );

    renderHistoryList();
}


function quickPrompt(text) {

    const input =
        getElement("userInput");

    if (!input) return;

    input.value = text;

    closeAll();

    input.focus();
}


/* =========================================================
   AUTO ROUTER
   ========================================================= */

function openAutoRouter() {

    closeAll();

    activeDomain = {
        name: "Auto Router",
        desc:
            "Universal intelligent specialist routing",
        parent: "86 Universal Domains"
    };

    activeSubdomain = {
        name: "Auto Router",
        desc:
            "Automatically identify the correct specialist",
        parent: "86 Universal Domains"
    };

    const container =
        getElement("chatContainer");

    if (!container) return;

    container.innerHTML = `
        <div
            class="specialist-workspace"
            style="
                --dc1:#6366f1;
                --dc2:#06b6d4;
            "
        >

            <div class="specialist-hero">

                <div class="specialist-hero-icon">
                    🔎
                </div>

                <div>

                    <div class="specialist-hero-kic
