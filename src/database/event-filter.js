const filterTitle = ({ title, keywords }) => {
    return keywords ? (title.toLowerCase().indexOf(keywords.toLowerCase()) > -1) : true;
}

const filterMonth = ({ date, month }) => {
    return month ? date.month.toLowerCase() == month.toLowerCase() : true;
}

const filterState = ({ location, acronym }) => {
    return acronym ? location.state.toLowerCase() == acronym.toLowerCase() : true;
}

module.exports = ({ event, month, state, keywords }) => {
    return filterTitle({ title: event.title, keywords }) &&
        filterMonth({ date: event.date, month }) &&
        filterState({ location: event.location, acronym: state });
}