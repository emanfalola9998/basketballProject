import { useState, useEffect } from 'react'
import axios from "axios"
import { getTeamsInterface } from '../utils/types'
import { getTeamInfoInterface } from '../utils/types'




export function MainComponent(): JSX.Element {
    const [getTeams, setGetTeams] = useState<getTeamsInterface[]>([])
    const [teamInfo, setTeamInfo] = useState<getTeamInfoInterface>(
        {id:0,
            abbreviation: "",
            city: "",
            conference: "",
            division: "",
            full_name: "",
            name: ""}
    )

    const apiLink = "https://balldontlie.io/api/v1/"

    useEffect(() => {
        async function getAllTeams() {
            const response = await axios.get(apiLink + "teams")
            setGetTeams(response.data.data)

        }
        getAllTeams()
    }, [])








    return (
        <>
            <h3> Welcome to the NBA   </h3>

            {getTeams.map((team) => (<button type="button" className="btn btn-primary" onClick={() => setTeamInfo(team)} key={team.id}>{team.id} {team.full_name}</button>))}
            {teamInfo.id !== 0 &&<ul className='list-group'>
                <li className='list-group-item'>{teamInfo.abbreviation}</li>
                <li className='list-group-item'>{teamInfo.city}</li>
                <li className='list-group-item'>{teamInfo.conference}</li>
                <li className='list-group-item'>{teamInfo.division}</li>
                <li className='list-group-item'>{teamInfo.full_name}</li>
                <li className='list-group-item'>{teamInfo.name}</li>
            </ul>
            }
        </>
    )

}