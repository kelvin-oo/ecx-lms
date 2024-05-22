/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = [
    "/",
  ];
  
  // * An array of routes that are used for authentication
  // * These routes will redirect logged in users to either /participant or /admin
  
  export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/new-verification",
  ];
  
  /**
   * The prefix for API authentication routes
   * Routes that start with this prefix are used for API authentication purposes
   */
  export const apiAuthPrefix = "/api/auth";
  
  /**
   * The default redirect paths after logging in
   */
  
  export const DEFAULT_LOGIN_REDIRECT = "/dashboard";