module.exports = {
    process: ({ snapshot }) => {
        const admins = [];
        snapshot.forEach((childSnapshot) => {
            admins.push(childSnapshot.val());
        });

        return admins;
    }
}
