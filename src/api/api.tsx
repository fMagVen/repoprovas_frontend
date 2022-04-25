import axios from 'axios'

function createConfig(token: string) {
	return {
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	};
}

const URL = process.env.REACT_APP_BASE_URL;

interface userData{
	email: string,
	password: string,
	new: boolean
}

export async function user(user: userData) {
	const promise = await axios.post(`${URL}/signuser`, user);
	return promise
}

export async function getTestsByTerm(token: string){
	const config = createConfig(token)
	const data = axios.get(`${URL}/tests/term`, config)
	return data
}

export async function getTestsByTeacher(token: string){
	const config = createConfig(token)
	const data = axios.get(`${URL}/tests/teacher`, config)
	return data
}