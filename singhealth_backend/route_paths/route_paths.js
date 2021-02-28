module.exports = (app) => {
	app.use(`/api/staff`, require(`../routes/staff.routes`));
};
