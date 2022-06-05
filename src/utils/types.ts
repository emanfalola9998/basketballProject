export interface getPlayersInterface{
    id: number;
    first_name: string;
    last_name: string;
    birth: {date: string, country: string};
    nba: {start: string, pro: string}
    height_feet: {height: number, inches: number, meters: number};
    weight: {pounds:number, kilograms: number};
    college: string;
    affiliation: string;
    leagues: {standard:{jersey:number, active: boolean, pos:string}}
    position: string;
    team: string;
}

export interface getTeamsInterface{
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

export interface getTeamInfoInterface {
    id:number,
    abbreviation: string
    city: string,
    conference: string,
    division: string,
    full_name: string,
    name: string
}