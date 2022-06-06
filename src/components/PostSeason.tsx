import axios from "axios";
import { useEffect, useState } from "react";
import { getPostSeasonInterface } from "../utils/types";

export default function PostSeason(): JSX.Element {
  const [allGames, setallGames] = useState<getPostSeasonInterface[]>([]);
  const [game, setGame] = useState<getPostSeasonInterface>({
    id: 1,
    date: "2018-10-16T00:00:00.000Z",
    home_team_score: 105,
    visitor_team_score: 87,
    season: 2018,
    period: 4,
    status: "Final",
    time: " ",
    postseason: false,
    home_team: {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics",
    },
    visitor_team: {
      id: 23,
      abbreviation: "PHI",
      city: "Philadelphia",
      conference: "East",
      division: "Atlantic",
      full_name: "Philadelphia 76ers",
      name: "76ers",
    },
  });
  const [date, setDate] = useState("");
  const [teamID, setTeamID] = useState<string>("");
  const [specificTeam, setSpecificTeam] = useState<getPostSeasonInterface[]>(
    []
  );
  const [postSeasonDate, setPostSeasonDate] = useState(2022);

  const apiLink = "https://balldontlie.io/api/v1/";
  useEffect(() => {
    async function getPostSeasonallGames() {
      const response = await axios.get(
        apiLink + `games?start_date=${date}&postseason=true`
      );
      setallGames(response.data.data);
    }
    getPostSeasonallGames();
  }, [date]);

  useEffect(() => {
    async function getAllGamesForSpecificTeam() {
      const response = await axios.get(
        apiLink +
          `games?seasons[]=${postSeasonDate}&seasons[]=${
            postSeasonDate - 1
          }&team_ids[]=${teamID}&postseason=true`
      );
      setSpecificTeam(response.data.data);
    }
    getAllGamesForSpecificTeam();
  }, [teamID, postSeasonDate]);

  return (
    <div>
      <br />
      <h3>PostSeason AllGames</h3>
      <h5>Set Time Period for games to view</h5>
      <input
        onChange={(e) => setDate(e.target.value)}
        placeholder="YYYY-MM-DD"
        value={date}
      />
      {allGames.map((game) => (
        <button key={game.id} onClick={() => setGame(game)}>
          {game.home_team.city}
          {game.date}
        </button>
      ))}
      {game.id !== 0 && (
        <ul>
          <li>
            {game.home_team.full_name} {game.home_team_score}
          </li>
          <li>
            {game.visitor_team.full_name} {game.visitor_team_score}
          </li>
        </ul>
      )}
      <br />
      <button
        onClick={() =>
          setGame({
            id: 0,
            date: "2018-10-16T00:00:00.000Z",
            home_team_score: 105,
            visitor_team_score: 87,
            season: 2018,
            period: 4,
            status: "Final",
            time: " ",
            postseason: false,
            home_team: {
              id: 2,
              abbreviation: "BOS",
              city: "Boston",
              conference: "East",
              division: "Atlantic",
              full_name: "Boston Celtics",
              name: "Celtics",
            },
            visitor_team: {
              id: 23,
              abbreviation: "PHI",
              city: "Philadelphia",
              conference: "East",
              division: "Atlantic",
              full_name: "Philadelphia 76ers",
              name: "76ers",
            },
          })
        }
      >
        Reset
      </button>
      <br />
      <select
        onChange={(e) => {
          const target = e.target.value.split("");
          const index = target.indexOf("]");
          target.splice(index, target.length);
          target.shift();
          const targetText = target.join("");
          setTeamID(targetText);
        }}
        value={teamID}
      >
        <option>[1] Atlanta Hawks - East</option>
        <option>[2] Boston Celtics - East</option>
        <option>[3] Brooklyn Nets - East</option>
        <option>[4] Charlotte Hornets - East</option>
        <option>[5] Chicago Bulls - East</option>
        <option>[6] Cleveland Cavaliers - East</option>
        <option>[7] Dallas Mavericks - West</option>
        <option>[8] Denver Nuggets - West</option>
        <option>[9] Detroit Pistons - East</option>
        <option>[10] Golden State Warriors - West</option>
        <option>[11] Houston Rockets - West</option>
        <option>[12] Indiana Pacers - East</option>
        <option>[13] LA Clippers - West</option>
        <option>[14] La LAkers - West</option>
        <option>[15] Memphis Grizzlies - West </option>
        <option>[16] Miami Heat - East</option>
        <option>[17] Milwaukee Bucks - East</option>
        <option>[18] Minesota Timberwolves - West</option>
        <option>[19] New Orleans Pelicans - West</option>
        <option>[20] New York Knicks - East</option>
        <option>[21] Oklahoma City Thunder - West</option>
        <option>[22] Orlando Magic - East</option>
        <option>[23] Philidelphia 76ers - East</option>
        <option>[24] Phoneix Sun - West</option>
        <option>[25] Portland Trail Blazers - West</option>
        <option>[26] Sacramento Kings - West</option>
        <option>[27] San Antonio Spurs - West</option>
        <option>[28] Toronto Raptors - East</option>
        <option>[29] Utah Jazz - West</option>
        <option>[30] Washington Wizards - East</option>
      </select>
      {console.log(teamID)}

      <input
        placeholder="YYYY-YYYY"
        value={postSeasonDate}
        onChange={(e) => setPostSeasonDate(parseInt(e.target.value))}
      />
      {specificTeam.map((team) => (
        <ul key={team.id}>
          {" "}
          <li>
            {team.home_team.name} {team.home_team_score}{" "}
            {team.visitor_team.name} {team.visitor_team_score}
          </li>
        </ul>
      ))}
    </div>
  );
}
