document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "attendance-status";
    const MEMBER_STORAGE_KEY = "attendance-members";

    const joinButton = document.getElementById("join-button");
    const absentButton = document.getElementById("absent-button");
    const confirmButton = document.getElementById("confirm-button");
    const memberInput = document.getElementById("member-status");
    const userNameInput = document.getElementById("user-name");
    const tableBody = document.getElementById("attendance-table-body");

    if (!joinButton || !absentButton || !confirmButton || !memberInput || !userNameInput || !tableBody) {
        return;
    }

    let selectedStatus = localStorage.getItem(STORAGE_KEY) || null;

    // 初期表示は非表示
    confirmButton.hidden = true;

    function getMembers() {
        try {
            return JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY) || "[]");
        } catch (error) {
            return [];
        }
    }

    function saveMembers(members) {
        localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(members));
    }

    function renderStatus() {
        const savedStatus = localStorage.getItem(STORAGE_KEY);

        if (savedStatus === "join") {
            memberInput.textContent = "参加";
        } else if (savedStatus === "absent") {
            memberInput.textContent = "不参加";
        } else {
            memberInput.textContent = "未回答";
        }
    }

    function renderTable() {
        const members = getMembers();
        tableBody.innerHTML = "";

        const joinMembers = members.filter((member) => member.status === "join");
        const absentMembers = members.filter((member) => member.status === "absent");
        const maxRows = Math.max(joinMembers.length, absentMembers.length);

        for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
            const row = document.createElement("tr");

            const joinCell = document.createElement("td");
            joinCell.textContent = joinMembers[rowIndex]?.name || "";

            const absentCell = document.createElement("td");
            absentCell.textContent = absentMembers[rowIndex]?.name || "";

            row.appendChild(joinCell);
            row.appendChild(absentCell);
            tableBody.appendChild(row);
        }
    }

    const setSelectedButton = (selectedButton, otherButton) => {
        selectedButton.classList.add("is-selected");
        otherButton.classList.remove("is-selected");
        confirmButton.hidden = false; // 選択後に表示
    };

    joinButton.addEventListener("click", () => {
        selectedStatus = "join";
        memberInput.textContent = "参加";
        setSelectedButton(joinButton, absentButton);
    });

    absentButton.addEventListener("click", () => {
        selectedStatus = "absent";
        memberInput.textContent = "不参加";
        setSelectedButton(absentButton, joinButton);
    });

    confirmButton.addEventListener("click", () => {
        if (!selectedStatus) {
            memberInput.textContent = "参加または不参加を選んでください";
            return;
        }

        const name = userNameInput.value.trim();
        if (!name) {
            memberInput.textContent = "名前を入力してください";
            return;
        }

        const members = getMembers();
        const existingMemberIndex = members.findIndex((member) => member.name === name);

        if (existingMemberIndex >= 0) {
            members[existingMemberIndex].status = selectedStatus;
        } else {
            members.push({ name, status: selectedStatus });
        }

        saveMembers(members);
        localStorage.setItem(STORAGE_KEY, selectedStatus);

        alert("提出しました");

        renderStatus();
        renderTable();
    });

    renderStatus();
    renderTable();
});