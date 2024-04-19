export const inserUsersDataQuery = `INSERT INTO sq_user 
("name", email, img_url, is_player,updated_by, created_at, updated_at)
VALUES %L
ON
CONFLICT (email)
DO UPDATE SET
	name = excluded.name,
	img_url = excluded.img_url,
	updated_at = excluded.updated_at;
`;
