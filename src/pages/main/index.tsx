import Topbar from "./topbar"
import { useState } from "react"
import TestNavigator from "./testNavigator"

export default function Main(){

	const [sortByTerm, setSortByTerm] = useState(true)
	return(
		<>
		<Topbar byTerm={sortByTerm}/>
		<TestNavigator byTerm={sortByTerm} sorter={setSortByTerm}/>
		</>
	)
}

export interface TestsFilter{
	byTerm: boolean
}