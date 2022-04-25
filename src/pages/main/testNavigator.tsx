import { Container, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import * as api from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { TestsFilter } from './index'
import TestLister from './testLister'

interface TestsFilter2 extends TestsFilter{
	sorter: Function
}

export default function TestNavigator(props: TestsFilter2){

	const {auth} = useAuth()
	const [testsData, setTestsData] = useState([])
	useEffect(()=>testsByTerm(),[])

	function addOpenKey(data: any){
		for(let i = 0; i < data.length; i++){
			data[i].open = false
		}
		setTestsData(data)
	}

	function testsByTeacher(){
		const tests = api.getTestsByTeacher(auth)
		tests.then(sortedTests => addOpenKey(sortedTests.data)).catch(e => console.log(e.message))
	}

	function testsByTerm(){
		const tests = api.getTestsByTerm(auth)
		tests.then(sortedTests => addOpenKey(sortedTests.data)).catch(e=> console.log(e.message))
	}

	return(
		<>
		<Container
		sx={{
			display: 'flex',
			marginTop: '10px'
		}}>
			<Button
			variant={props.byTerm ? 'contained' : 'outlined'}
			onClick={() => {if(!props.byTerm) {props.sorter(true); testsByTerm()}}}
			>DISCIPLINAS</Button>
			<Button variant={!props.byTerm ? 'contained' : 'outlined'}
			onClick={() => {if(props.byTerm) {props.sorter(false); testsByTeacher()}}}
			>PESSOA INSTRUTORA</Button>
			<Button variant='outlined'>ADICIONAR</Button>
		</Container>
		<Container>
			<TestLister testsData={testsData} setTestsData={setTestsData} byTerm={props.byTerm}/>
		</Container>
		</>
	)
}