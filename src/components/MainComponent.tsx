import { useState, useEffect } from "react";
import axios from "axios";
import { getTeamsInterface } from "../utils/types";
import { getTeamInfoInterface } from "../utils/types";
import { getPlayersInterface } from "../utils/types";
import logo from "../images/kobe.jpg";
import PostSeason from "./PostSeason";

export function MainComponent(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [getTeams, setGetTeams] = useState<getTeamsInterface[]>([]);
  const [teamInfo, setTeamInfo] = useState<getTeamInfoInterface>({
    id: 0,
    abbreviation: "",
    city: "",
    conference: "",
    division: "",
    full_name: "",
    name: "",
  });
  const [allPlayers, getAllPlayers] = useState<getPlayersInterface[]>([]);
  const [playerInfo, getPlayerInfo] = useState<getPlayersInterface>({
    id: 0,
    first_name: "",
    last_name: "",
    position: "",
    height_feet: 0,
    height_inches: 0,
    weight_pounds: 0,
    team: {
      id: 0,
      abbreviation: "",
      city: "",
      conference: "",
      division: "",
      full_name: "",
      name: "",
    },
  });

  const apiLink = "https://balldontlie.io/api/v1/";

  useEffect(() => {
    async function getAllTeams() {
      try {
        const response = await axios.get(apiLink + "teams");
        setGetTeams(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllTeams();
  }, []);

  useEffect(() => {
    async function getPlayers() {
      try {
        const response = await axios.get(
          apiLink + `players?per_page=25&search=${searchTerm}`
        );
        getAllPlayers(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPlayers();
  }, [searchTerm]);

  const filteredPlayerNames = isSearchTerminPlayers(allPlayers, searchTerm);

  function isSearchTerminPlayers(
    getPlayers: getPlayersInterface[],
    searchTerm: string
  ) {
    const playerSearch = getPlayers.filter(
      (obj) =>
        obj["first_name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        obj["last_name"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return playerSearch;
  }
  const sortedPlayerNames = filteredPlayerNames.sort((a, b) =>
    a.last_name.toLowerCase() > b.last_name.toLowerCase() ? 1 : -1
  );

  return (
    <div className="text-bg-dark p-3">
      <h3> Welcome to the NBA </h3>
      <img src={logo} alt="NBA logo" width={200} />
      <br />

      {getTeams.map((team) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setTeamInfo(team)}
          key={team.id}
        >
          {team.id} {team.full_name}
        </button>
      ))}
      {teamInfo.id !== 0 && (
        <ul className="list-group">
          <li className="list-group-item">
            Team Name: <b>{teamInfo.full_name}</b>
          </li>
          <li className="list-group-item">
            Conference: <b>{teamInfo.conference}</b>
          </li>
          <li className="list-group-item">
            Division: <b> {teamInfo.division}</b>
          </li>
        </ul>
      )}
      <br />
      <button
        onClick={() =>
          setTeamInfo({
            id: 0,
            abbreviation: "",
            city: "",
            conference: "",
            division: "",
            full_name: "",
            name: "",
          })
        }
      >
        Reset
      </button>
      <br />
      <div>
        <input
          placeholder="Type NBA Player Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        Displaying {filteredPlayerNames.length} out of {allPlayers.length}
      </div>
      {sortedPlayerNames.map((player) => (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => getPlayerInfo(player)}
          key={player.id}
        >
          {player.first_name} {player.last_name}
        </button>
      ))}
      {playerInfo.id !== 0 && (
        <ul className="list-group">
          <li className="list-group-item">
            ID: <b>{playerInfo.id}</b>
          </li>
          <li className="list-group-item">
            First Name: <b>{playerInfo.first_name}</b>
          </li>
          <li className="list-group-item">
            Last Name: <b>{playerInfo.last_name}</b>
          </li>
          <li className="list-group-item">
            Height:{" "}
            <b>
              {playerInfo.height_feet}FT{playerInfo.height_inches}
            </b>
          </li>
          <li className="list-group-item">
            Position: <b>{playerInfo.position}</b>
          </li>
          <li className="list-group-item">
            Team City and Abbv:{" "}
            <b>
              {playerInfo.team.city}, ({playerInfo.team.abbreviation})
            </b>
          </li>
        </ul>
      )}
      <br />
      <button
        onClick={() =>
          getPlayerInfo({
            id: 0,
            first_name: "",
            last_name: "",
            position: "",
            height_feet: 0,
            height_inches: 0,
            weight_pounds: 0,
            team: {
              id: 0,
              abbreviation: "",
              city: "",
              conference: "",
              division: "",
              full_name: "",
              name: "",
            },
          })
        }
      >
        Reset
      </button>
      <PostSeason />
    </div>
  );
}
