module.exports = (app) => {
	app.use(`/api/audit`, require(`../routes/audit.routes`));
	app.use(`/api/issue`, require(`../routes/issue.routes`));
	app.use(`/api/message`, require(`../routes/message.routes`));
	app.use(`/api/staff`, require(`../routes/staff.routes`));
	app.use(`/api/tenant`, require(`../routes/tenant.routes`));
};
