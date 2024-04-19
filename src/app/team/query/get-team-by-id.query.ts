export const getTeamByIdQuery = `WITH team_details AS (
  SELECT 
    t.id, 
    t.name AS team_name,
    t.colour as colour,
    jsonb_build_object(
      'id', su.id,
      'name',su."name", 
      'image_url', su.img_url) AS manager
    FROM team t
  LEFT JOIN sq_user su ON t.manager_id = su.id 
  WHERE t.id = $1),
player_list AS (
  SELECT 
    jsonb_agg(jsonb_build_object(
      'id',su.id,	
      'name',su."name",
      'image_url', su.img_url 
    )) AS player_details
  FROM team_player_relation tpr 
  LEFT JOIN sq_user su ON tpr.player_id = su.id
  WHERE tpr.team_id=$1)
SELECT 
  jsonb_build_object(
  'id', td.id,
  'name', td.team_name,
  'colour',td.colour,
  'manager', td.manager,
  'players',pl.player_details) AS team FROM   player_list pl, team_details td;
  `;
