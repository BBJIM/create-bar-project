/**
 * Wraps a function so all responses will be the same for the api.
 * @param res the response object
 * @param action the action that will be wrapped and called
 * @param actionParams the params for the functions by order
 */
const actionWrapper = async ({
	res,
	action,
	actionParams,
}: {
	res: any;
	action: (...params: any) => any;
	actionParams: any[];
}) => {
	const response = {
		status: 200,
		error: '',
		data: null,
	};
	try {
		response.data = await action(...actionParams);
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
