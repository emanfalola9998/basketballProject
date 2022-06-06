export interface getPlayersInterface {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height_feet: number;
  height_inches: number;
  weight_pounds: number;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
}

export interface getTeamsInterface {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface getTeamInfoInterface {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface getPostSeasonInterface {
  id: number;
  date: string;
  home_team_score: number;
  visitor_team_score: number;
  season: 2018;
  period: 4;
  status: "Final";
  time: string;
  postseason: false;
  home_team: {
    id: 2;
    abbreviation: "BOS";
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  visitor_team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
}
