const eventFilter = require('./event-filter');

const eventMatchFilter = ({ event, filter }) => {
    const { month, state, keywords } = filter;
    return eventFilter({ event, month, state, keywords });
}

module.exports = {
    process: ({ filter, snapshot }) => {
        const { offset = 0, limit = 30 } = filter;

        let offsetCount = 0;

        const events = [];
        snapshot.forEach((childSnapshot) => {
            if (events.length < limit) {
                if (offsetCount >= offset) {
                    const event = childSnapshot.val();
                    event.key = childSnapshot.key;
                    if (!event.pending && eventMatchFilter({ event, filter })) {
                        events.push(event);
                    } else {
                        offsetCount--;
                    }
                }
            } else {
                return true;
            }

            offsetCount++;
        });

        return events;
    }
}