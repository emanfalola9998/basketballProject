import { useState, useEffect } from 'react'
import axios from "axios"
import { getPlayersInterface } from '../utils/types'


export function MainComponent(): JSX.Element{    
    const [getPlayers, setGetPlayers] = useState<getPlayersInterface[]>([])

    useEffect(() => {
        async function getAllPlayers() {
            const response = await axios.get("https://balldontlie.io/api/v1/players")
            setGetPlayers(response.data)
        }
        getAllPlayers()
    },[])
    
    return (
        <>
            
        </>
    )

}