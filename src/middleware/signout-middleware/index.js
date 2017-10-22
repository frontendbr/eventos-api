module.exports = ({
	app,
	db
}) => {
	app.use((req, res) => {
		db.signOut().then(() => {
			console.log('Signed Out');
		}).catch((error) => {
			console.error('Sign Out Error', error);
		});
	});
};
