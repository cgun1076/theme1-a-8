const joinButton = document.getElementById('join-button');
const absentButton = document.getElementById('absent-button');
const confirmButton = document.getElementById('confirm-button');

if (joinButton && absentButton && confirmButton) {
    const choiceButtons = [joinButton, absentButton];

    // 初期状態: 未選択
    confirmButton.disabled = true;

    const updateSelection = (selectedButton) => {
        choiceButtons.forEach((button) => {
            const isSelected = button === selectedButton;

            button.setAttribute('aria-pressed', String(isSelected));
            button.dataset.selected = String(isSelected);

            // 視覚的に選択状態を分かりやすくする（CSSファイルは使わない）
            button.style.opacity = isSelected ? '0.75' : '1';
            button.style.transform = isSelected ? 'translateY(1px)' : 'none';
            button.style.fontWeight = isSelected ? 'bold' : 'normal';
            button.style.backgroundColor = isSelected ? '#dfe7f5' : '';
            button.style.borderColor = isSelected ? '#5b8def' : '';
            button.style.boxShadow = isSelected ? '0 0 0 2px rgba(91, 141, 239, 0.4)' : 'none';
        });

        confirmButton.disabled = selectedButton == null;
    };

    choiceButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const isAlreadySelected = button.dataset.selected === 'true';
            updateSelection(isAlreadySelected ? null : button);
        });
    });

    // いったん未選択状態を保持
    updateSelection(null);
}
