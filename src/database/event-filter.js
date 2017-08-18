const moment = require('moment');

const filterTitle = ({ title, keywords }) => {
    return keywords ? (title.toLowerCase().indexOf(keywords.toLowerCase()) > -1) : true;
}

const filterMonth = ({ date, month }) => {
    return month ? moment(date, 'DD/MM/YYYY').month() == month : true;
}

module.exports = ({ event, month, state, keywords }) => {
    return filterTitle({ title: event.title, keywords }) &&
        filterMonth({ date: event.date, month });
}