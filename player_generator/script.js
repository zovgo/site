function addContact() {
    const contactsDiv = document.getElementById('contacts');
    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    contactDiv.innerHTML = `
                <div class="field">
                    <label>Тип контакта:</label>
                    <select name="contact_type">
                        <option value="1">VK</option>
                        <option value="2">Telegram</option>
                    </select>
                </div>
                <div class="field">
                    <label>Значение контакта (ссылка):</label>
                    <input type="text" name="contact_value" placeholder="URL">
                </div>
                <div class="field">
                    <label>Заметка о контакте (например, 'устаревший'):</label>
                    <input type="text" name="contact_note">
                </div>
                <button type="button" class="remove-btn" onclick="removeContact(this)">Удалить контакт</button>
            `;
    contactsDiv.appendChild(contactDiv);
}

function removeContact(button) {
    button.parentElement.remove();
}

function generateJSON() {
    const player = {
        primary_name: document.querySelector('input[name="primary_name"]').value,
        names: document.querySelector('input[name="names"]').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s !== ''),
        contacts: [],
        device: {
            os: parseInt(document.querySelector('select[name="device_os"]').value) || 1,
            gamepad: document.querySelector('input[name="device_gamepad"]').value,
            refresh_rate: parseInt(document.querySelector('input[name="device_refresh_rate"]').value) || 60
        },
        tier: parseInt(document.querySelector('select[name="tier"]').value) || 1,
        youtube: document.querySelector('input[name="youtube"]').value,
        note: document.querySelector('textarea[name="note"]').value,
        global_rating: parseInt(document.querySelector('input[name="global_rating"]').value) || 0
    };

    const contactElements = document.querySelectorAll('.contact');
    contactElements.forEach(contactEl => {
        const type = parseInt(contactEl.querySelector('select[name="contact_type"]').value);
        const value = contactEl.querySelector('input[name="contact_value"]').value;
        const note = contactEl.querySelector('input[name="contact_note"]').value;

        if (value.trim()) {
            player.contacts.push({
                type: type,
                value: value,
                note: note
            });
        }
    });

    document.getElementById('result').textContent = JSON.stringify(player, null, 2);
    return JSON.stringify(player, null, 2);
}

addContact();