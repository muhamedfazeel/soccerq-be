export const getUserByIdQuery = `SELECT 
  id, name, email, is_active 
FROM sq_user
where
  id = $1;
`;
