import { useState, useEffect } from 'react'
import axios from "axios"
import { getTeamsInterface } from '../utils/types'
import { getTeamInfoInterface } from '../utils/types'
import {getPlayersInterface} from '../utils/types'



export function MainComponent(): JSX.Element {
    const [id, setID] = useState(0)
    const [searchTerm, setSearchTerm] = useState<string>("")
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
    const [allPlayers, getAllPlayers] = useState<getPlayersInterface[]>([])
    const [playerInfo, getPlayerInfo] = useState<getPlayersInterface>({
        id:0,
        first_name:'',
        last_name:'',
        position:'',
        height_feet: 0,
        height_inches: 0,
        weight_pounds: 0,
        team:{
          id:0,
          abbreviation:'',
          city:'',
          conference:'',
          division:'',
          full_name:'',
          name:''
        }
    })


    const apiLink = "https://balldontlie.io/api/v1/"

    useEffect(() => {
        async function getAllTeams() {
            const response = await axios.get(apiLink + "teams")
            setGetTeams(response.data.data)

        }
        getAllTeams()
    }, [])

    useEffect(() => {
        async function getPlayers() {
            const response = await axios.get(apiLink + "players/" )
            getAllPlayers(response.data.data)
        }
        getPlayers()

    }, [id])

   
    const filteredPlayerNames = isSearchTerminPlayers(allPlayers, searchTerm)

    function isSearchTerminPlayers(getPlayers: getPlayersInterface[],searchTerm: string) {
    const playerSearch = getPlayers.filter(
        (obj) =>
        obj["first_name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj["last_name"].toLowerCase().includes(searchTerm.toLowerCase())
    )

    return playerSearch;
    }







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
            <div>
                <input 
                    placeholder='Type NBA Player Name'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                Displaying {filteredPlayerNames.length} out of {allPlayers.length}
            </div>
            {filteredPlayerNames.map((player) => (<button type='button' className= "btn btn-success" onClick={() => getPlayerInfo(player)} key={player.id}>{player.first_name}</button>))}
            {playerInfo.id !==0 && <ul className='list-group'>
                <li className='list-group-item'>{playerInfo.first_name}</li>
                <li className='list-group-item'>{playerInfo.last_name}</li>
                <li className='list-group-item'>{playerInfo.height_feet}</li>
                <li className='list-group-item'>{playerInfo.height_inches}</li>
                <li className='list-group-item'>{playerInfo.position}</li>
                <li className='list-group-item'>{playerInfo.team.abbreviation}</li>
                <li className='list-group-item'>{playerInfo.team.city}</li>
                <li className='list-group-item'>{playerInfo.id}</li>
            </ul>}
            {console.log(allPlayers)}
        </>
    )

}