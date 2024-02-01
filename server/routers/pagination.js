function getPaginationParameters(queryParameters) {
	const page = Math.abs(queryParameters.page) || 1;
	const limit = Math.abs(queryParameters.limit) || 0;
	const skip = (page - 1) * limit;

	return { skip, limit };
};

module.exports = { getPaginationParameters };