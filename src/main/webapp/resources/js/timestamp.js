function renderTimestampsOnTable() {
    const els = document.getElementsByClassName('timestamp');

    for (let i = 0; i < els.length; i++) {
        const el = els.item(i);
        const timestamp = parseInt(el.innerHTML);
        if (!isNaN(timestamp) && el.innerHTML.match('^[0-9]+$')) {
            el.innerHTML = new Date(timestamp).toLocaleString();
        }
    }
}

renderTimestampsOnTable();
setInterval(renderTimestampsOnTable, 200);