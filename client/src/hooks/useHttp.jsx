import React from "react";

const baseUrl = 'http://localhost:4000/api'

export const useHttp = () => {
	const [loader, setLoader] = React.useState(false)

	const request = React.useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		try {
			setLoader(true)
			if (body) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
 			const res = await fetch(baseUrl + url, {method, headers, body})
			
			return await res.json()
		} catch (e) {
			console.log(e)
		} finally {
			setLoader(false)
		}
	}, [])

	return {loader, request}
}