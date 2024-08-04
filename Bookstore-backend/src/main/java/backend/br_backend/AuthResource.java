package backend.br_backend;

import backend.model.AuthorizationToken;
import backend.model.Database;
import backend.model.JWTUtils;
import backend.model.User;
import backend.model.UserLoginHelper;
import backend.requests.LoginRequest;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.sql.SQLException;

@Path("/auth")
public class AuthResource {


    public AuthResource() {
        base = new Database();
        jwtUtils = new JWTUtils();
    }

    public AuthResource(Database base, JWTUtils jwtUtils) {
        this.base = base;
        this.jwtUtils = jwtUtils;
    }

    Database base;
    JWTUtils jwtUtils;

    @POST
    @Path("/login")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response login(LoginRequest loginRequest) throws SQLException {
        UserLoginHelper isAuthenticated = /*new Database()*/ base.verifyLogin(loginRequest);
        if (isAuthenticated.userId != -1) {
            String login = loginRequest.getLogin();
            boolean isModerator = /*new Database()*/ base.isModerator(loginRequest);
            return jwtUtils.generateJWT(login, isModerator, isAuthenticated.userId, isAuthenticated.avatar);
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
        }
    }

    @POST
    @Path("/refresh")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @AuthorizationToken()
    public Response refreshToken(JsonObject jsonObject) {
        String refreshToken = jsonObject.getString("refreshToken");
        return jwtUtils.refreshJWT(refreshToken);
    }


    @POST
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @AuthorizationToken()
    public Response logout(JsonObject jsonObject) {
        String refreshToken = jsonObject.getString("refreshToken");
        boolean removed = jwtUtils.removeRefreshTokenFromFile(refreshToken);
        if (removed) {
            return Response.ok("Success logout").build();
        } else {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @POST
    @Path("/update/{login}")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    @AuthorizationToken()
    public Response update(@PathParam("login") String login, JsonObject userData) {
        //Database data = new Database();
        Boolean added = base.updateUser(login, userData);
        if (added)
            return Response.status(Response.Status.OK).entity( "Success changed user data" ).build();
        else
            return Response.status(Response.Status.CONFLICT).entity("No user").build();

    }

    @GET
    @Path("/user/info")
    @Produces(MediaType.APPLICATION_JSON)
    @AuthorizationToken()
    public Response getAccountInfo(@HeaderParam("Authorization") String authorizationHeader) {
            String token = authorizationHeader.substring("Bearer ".length());
            String currentUserLogin = jwtUtils.getLoginFromToken(token).orElse(null);

            //Database data = new Database();
            User currentUserInfo = base.getAccountInfo(currentUserLogin);

            return Response.ok(currentUserInfo).build();
    }

    @GET
    @Path("/user/info/{login}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAccountInfoByLogin(@PathParam("login") final String login) {
        //Database data = new Database();
        User userInfo = base.getAccountInfo(login);

        return Response.ok(userInfo).build();
    }

    @GET
    @Path("/user/info/id/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAccountInfoById(@PathParam("id") final Integer id) {
        //Database data = new Database();
        User userInfo = base.getAccountInfoById(id);

        return Response.ok(userInfo).build();
    }

}
