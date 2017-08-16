module.exports = {
    process: ({ filter, snapshot }) => {
        const { month, state, keywords, offset = 0, limit = 30 } = filter;

        let offsetCount = 0;

        const events = [];
        snapshot.forEach((childSnapshot) => {

            if (events.length < limit) {
                if (offsetCount >= offset) {
                    const event = childSnapshot.val();
                    event.key = childSnapshot.key;
                    events.push(event);
                }
            } else {
                return true;
            }

            offsetCount++;
        });

        return events;
    }
}