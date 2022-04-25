import { List, ListItemButton, ListItemText, Collapse } from '@mui/material'
import {Add, Close} from '@mui/icons-material';

interface testsDataAndFunction {
	testsData: any[]
	setTestsData: Function
}

export default function TestLister({testsData, setTestsData}: testsDataAndFunction){

	console.log(testsData)

	function resetOpenKeys(id: number){
		let newTestData = []
		for(let i = 0; i < testsData.length; i++){
			if(testsData[i].id === id){
				newTestData.push({...testsData[i], open: !testsData[i].open})
			}
			else{
				newTestData.push({...testsData[i]})
			}
		}
		setTestsData(newTestData)
	}

if(testsData.length < 1){
	return(
		<h1>loading</h1>
	)
}
else{
	return(
		<List>
		{testsData.map((item:any)=>{
			return (<ListItemButton key={item.id} onClick={() => resetOpenKeys(item.id)}>
						<ListItemText primary={`${item.number} periodo`}/>
						{item.open ? <Close/> : <Add/>}
						<Collapse in={item.open}>
							<List>
							{item.disciplines.map((item2:any)=>{
							return (<ListItemButton>
								<ListItemText primary={`${item2.name}, ${item2.teachers[0]}`}/>
							</ListItemButton>)	
							})}
							</List>
						</Collapse>
					</ListItemButton>)
		})}
		</List>
	)
}
}