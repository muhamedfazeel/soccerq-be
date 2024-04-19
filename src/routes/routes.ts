import authRoutes from "../app/auth/auth.router";
import teamRoutes from "../app/team/team.router";
import userRoutes from "../app/user/user.router";

const appRoutes = {
  userRoutes,
  authRoutes,
  teamRoutes,
};

export default appRoutes;
