export const getAllUsersQuery = `SELECT
id, name, email, img_url 
FROM sq_user WHERE is_active = TRUE`;
