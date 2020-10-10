// TODO: fix this?
const actionWrapper = async (res, action: (...params: any) => any, ...params) => {
	const response = {
		status: 200,
		error: '',
		data: null,
	};
	try {
		response.data = await action(...params);
	} catch (err) {
		response.status = err.status || 400;
		if (err.message) {
			response.error = err.message;
		} else {
			response.error = err;
		}
	} finally {
		res.status(response.status).send(response.error ? { error: response.error } : response.data);
	}
};

export default actionWrapper;
