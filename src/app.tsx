import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Signuser from './pages/signuser'
import Main from './pages/main'
import { AuthProvider } from './contexts/authContext'

export default function App(){
	return(
		<>
		<CssBaseline enableColorScheme/>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Signuser/>}/>
					<Route path='/provas' element={<Main/>}/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
		</>
	)
}