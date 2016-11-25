const _ = require('lodash');

module.exports = function(requiredFields, ...sources) {
	const config = _.pick(_.merge({}, ...sources), requiredFields);
	const missingKeys = _.difference(requiredFields, _.keys(config));

	if (missingKeys.length > 0) throw new Error(`Required configuration keys missing: ${missingKeys.join(', ')}`);

	const capulet = {};

	capulet.get = (key) => {
		if (!key) return _.merge({}, config);
		return config[key];
	};

	capulet.middleware = () =>
		(req) => {
			req.config = key => capulet.get(key);
		};

	return capulet;
};
