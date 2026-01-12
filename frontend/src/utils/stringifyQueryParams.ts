export default function stringifyQueryParams(params:any) {
	const filteredParams = Object.keys(params).reduce((newParams, key) => {
		if (
			typeof params[key] !== "undefined" &&
			params[key] !== "" &&
            // @ts-ignore
			params[key] !== []
		) {
			return {
				...newParams,
				[key]: params[key],
			};
		}

		return newParams;
	}, {});

	return new URLSearchParams(filteredParams).toString();
}