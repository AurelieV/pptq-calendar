user = (user) =>  {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname
  };
}

region = (region) => {
  if (!region) return null;
  return {
    id: region.id,
    captainId: region.captainId,
    name: region.name,
    captain: user(region.captain)
  };
}

tournament = (tournament) => {
  if (!tournament) return null;
  const result = Object.assign({}, tournament);
  delete result.googleId;
  result.headJudge = user(result.headJudge);
  result.region = region(result.region);
  result.season = season(result.season);

  return result;
}

season = (season) => {
  if (!season) return null;
  const result = Object.assign({}, season);
  result.tournaments = result.tournaments || [];
  result.tournaments = result.tournaments.map(tournament);

  return result;
}

module.exports = {
  user,
  region,
  tournament,
  season
}
