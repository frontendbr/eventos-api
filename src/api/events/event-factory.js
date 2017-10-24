const update = (body) => {
	const event = build(body);
	if (body.approve) {
		event.pending = false;
	}

	return event;
};

const insert = (body) => {
	const event = build(body);

	const location = event.location || {};

	location.locationUrl = location.locationUrl || '';
	location.zipCode = location.zipCode || '';
	event.image = event.image || '';
	return event;
};

const build = (body) => {
	return {
		title: body.title,
		date: body.date,
		location: body.location,
		shortDescription: body.shortDescription,
		price: body.price,
		link: body.link,
		image: body.image,
		innerLink: 'inner.html',
		pending: true
	};
};

module.exports = {
	insert,
	update
};
