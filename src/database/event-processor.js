
const eventMatchFilter = ({ event, filter }) => {
    //TODO insensitive case
    return (event.title.indexOf(filter.keywords) > -1);
}

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
                    if (eventMatchFilter({ event, filter })) {
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