export const userDataUpsertQuery = `
INSERT INTO sq_user 
("name", email, img_url)
VALUES ($1,$2,$3)
ON
CONFLICT (email)
DO UPDATE SET
	name = excluded.name,
	img_url = excluded.img_url,
	updated_at = excluded.updated_at
RETURNING id, name, email;`;
