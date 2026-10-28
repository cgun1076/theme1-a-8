document.addEventListener("DOMContentLoaded", () => {
    const confirmButton = document.querySelector("#confirm-button");
    const joinButton = document.querySelector("#join-button");
    const absentButton = document.querySelector("#absent-button");

    if (!confirmButton || !joinButton || !absentButton) return;

    // 最初は非表示
    confirmButton.hidden = true;

    const showConfirmButton = () => {
        confirmButton.hidden = false;
    };

    joinButton.addEventListener("click", showConfirmButton);
    absentButton.addEventListener("click", showConfirmButton);
});