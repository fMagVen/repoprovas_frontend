import { Container, Box, Stack, Button, IconButton, InputAdornment, Link, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/repoprovas_logo.svg'
import useAuth from "../../hooks/useAuth";
import * as api from '../../api/api'

export default function Signuser(){

	const [forms, setForms] = useState({
		email: '',
		password: '',
		repeatPassword: '',
		showPassword: false,
		isLoginPage: true
	})
	const { auth, signuser } =  useAuth()
	const navigate = useNavigate()

	useEffect(()=>{
		auth && navigate('/provas')
	}, [])

	async function submit(){
		if(forms.isLoginPage){
			try{
				const user = await api.user({email: forms.email, password: forms.password, new: false})
				signuser(user.data)
				navigate('/provas')
			}catch(e){
				console.log(e)
			}
		}
		else{
			try{
				await api.user({email: forms.email, password: forms.password, new: true})
				setForms({...forms, isLoginPage: true})
			}catch(e){
				console.log(e)
			}
		}
	}

	return(
		<Container>
			<Box sx={{width: '300px', margin: 'auto'}}>

				<img src={Logo} alt='Repoprovas Logo' width='292px' height='54px'/>

				<Stack spacing={2} sx={{width: '300px'}}>
					<h1>{forms.isLoginPage ? 'Login' : 'Cadastro'}</h1>
					<Button variant="contained">ENTRAR COM O GITHUB</Button>
					<p>---------------ou-------------------</p>
					<TextField
						label="Email"
						type="email"
						value={forms.email}
						onChange={(e) => setForms({...forms, email: e.target.value})}
						size='small'
						required
					/>
					<TextField
						label="Password"
						type={forms.showPassword ? 'text' : 'password'}
						value={forms.password}
						onChange={(e) => setForms({...forms, password: e.target.value})}
						size='small'
						InputProps={{
							endAdornment: <InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setForms({...forms, showPassword: !forms.showPassword})}
									edge="end"
								>
									{forms.showPassword ? <VisibilityOff/> : <Visibility/>}
								</IconButton>
							</InputAdornment>
						}}
						required
					/>
					{!forms.isLoginPage &&
						<TextField
							label="Confirm password"
							type={forms.showPassword ? 'text' : 'password'}
							value={forms.repeatPassword}
							onChange={(e) => setForms({...forms, repeatPassword: e.target.value})}
							size='small'
							InputProps={{
								endAdornment: <InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() => setForms({...forms, showPassword: !forms.showPassword})}
										edge="end"
									>
										{forms.showPassword ? <VisibilityOff/> : <Visibility/>}
									</IconButton>
								</InputAdornment>
							}}
							required
						/>
					}
				</Stack>
				<br/>
				<Link onClick={() => setForms({...forms, isLoginPage: !forms.isLoginPage})}
					sx={{cursor: 'pointer'}}>
						{forms.isLoginPage ? 'Não possuo ' : 'Já possuo '}cadastro
				</Link>
				<Button variant="contained" onClick={submit}>{forms.isLoginPage ? 'Entrar' : 'Cadastrar'}</Button>
			</Box>
		</Container>
	)
}