module.exports = {
    process: (filter, snapshot) => {
        const events = [];
        snapshot.forEach((childSnapshot) => {
            const event = childSnapshot.val();
            event.key = childSnapshot.key;
            events.push(event);
        });

        return events;
    }
}