import Logo from "../../assets/repoprovas_logo.svg"
import {ExitToApp} from '@mui/icons-material';
import { IconButton, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { TestsFilter } from "./index";

export default function Topbar(props: TestsFilter){
	return(
		<>
		<Container
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center'
		}}>
			<Container
				sx={{display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'}}
			>
				<img src={Logo} alt="repoprovas logo"/>
				<Link to='/'>
					<IconButton>
						<ExitToApp sx={{
							width: '32px',
							height: '36px'
						}}/>
					</IconButton>
				</Link>
			</Container>
			<TextField
				label={props.byTerm ? 'Pesquise por disciplina' : 'Pesquise por pessoa instrutora'}
				sx={{
					marginTop: '10px'
				}}
			/>
		</Container>
		</>
	)
}