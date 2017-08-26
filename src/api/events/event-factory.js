const update = (body) => {
    const event = insert(body);
    if (body.approve) {
        event.pending = false;
    }

    return event;
}

const insert = (body) => {
    const location = body.location;

    location.locationUrl = location.locationUrl || '';
    location.zipCode = location.zipCode || '';


    return {
        title: body.title,
        date: body.date,
        location: body.location,
        shortDescription: body.shortDescription,
        price: body.price,
        link: body.link,
        image: body.image || '',
        innerLink: 'inner.html',
        pending: true
    };
}


module.exports = {
    insert,
    update
}