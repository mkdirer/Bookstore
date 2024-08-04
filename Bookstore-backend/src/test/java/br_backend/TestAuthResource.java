package br_backend;

import backend.br_backend.AuthResource;
import backend.model.Database;
import backend.model.JWTUtils;
import backend.model.User;
import backend.model.UserLoginHelper;
import backend.requests.LoginRequest;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.core.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class TestAuthResource {

    private final Database mockBase = mock(Database.class);

    private final JWTUtils mockJwtUtils = mock(JWTUtils.class);
    private LoginRequest notValidLoginRequest,  validLoginRequest;

    private JsonObject tokenInJson, notValidTokenInJson;

    private JsonObject userUpdateData;

    private User user;


    @InjectMocks
    private AuthResource authResource;

    @Before
    public void start() {
        notValidLoginRequest = new LoginRequest("user0", "pass0");
        validLoginRequest = new LoginRequest("user1", "pass1");

        tokenInJson = Json.createObjectBuilder().add("refreshToken", "Token").build();
        notValidTokenInJson = Json.createObjectBuilder().add("refreshToken", "NotValidToken").build();

        userUpdateData = Json.createObjectBuilder()
                .add("login", "user9")
                .add("phone", "321123321")
                .add("password", "LKJjlkjlkJ")
                .build();

        user = new User(0, "user0", "pass0", "fname0", "lname0", "mail0", "123123123", false, "avatar0");
    }

    @Test
    public void loginShouldResponseUnauthorizedTest() {
        Mockito.when( mockBase.verifyLogin( notValidLoginRequest ) ).thenReturn(  new UserLoginHelper() );
        try {
            Response response = authResource.login(notValidLoginRequest);

            assertEquals( Response.Status.UNAUTHORIZED.getStatusCode(), response.getStatus() );
            assertEquals( "Invalid credentials", response.getEntity() );
        } catch ( Exception e) { }
    }

    @Test
    public void loginShouldResponseWithTokenTest() {
        UserLoginHelper tmp=new UserLoginHelper();
        tmp.userId=1;
        tmp.avatar="avatar";
        Mockito.when( mockBase.verifyLogin(validLoginRequest) ).thenReturn( tmp );
        Mockito.when( mockBase.isModerator(validLoginRequest) ).thenReturn( false );
        Mockito.when( mockJwtUtils.generateJWT("user1", false, 1, "avatar") ).thenReturn( Response.ok("Token").build() );
        try {
            Response response = authResource.login(validLoginRequest);

            assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
            assertEquals("Token", response.getEntity());
        } catch (Exception e) {
        }
    }

    @Test
    public void refreshTokenTest() {
        Mockito.when( mockJwtUtils.refreshJWT("Token") ).thenReturn( Response.ok("NewToken").build() );
        Response response = authResource.refreshToken(tokenInJson);

        assertEquals( "NewToken", response.getEntity() );
    }

    @Test
    public void logoutShouldResponseInternalError() {
        Mockito.when( mockJwtUtils.removeRefreshTokenFromFile("NotValidToken") ).thenReturn(false);
        Response response = authResource.logout( notValidTokenInJson );

        assertEquals( Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), response.getStatus() );
    }

    @Test
    public void logoutShouldResponseOk() {
        Mockito.when(mockJwtUtils.removeRefreshTokenFromFile("Token") ).thenReturn(true);
        Response response = authResource.logout(tokenInJson);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( "Success logout", response.getEntity() );
    }


    @Test
    public void updateShouldResponseConflict() {
        Mockito.when(mockBase.updateUser("user0", userUpdateData)).thenReturn(false);
        Response response = authResource.update("user0", userUpdateData);

        assertEquals(Response.Status.CONFLICT.getStatusCode(), response.getStatus());
        assertEquals( "No user", response.getEntity());
    }

    @Test
    public void updateShouldResponseOk() {
        Mockito.when(mockBase.updateUser("user0", userUpdateData)).thenReturn(true);
        Response response = authResource.update("user0", userUpdateData);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals( "Success changed user data", response.getEntity());
    }

    @Test
    public void getAccountInfoTest() {
        Mockito.when(mockJwtUtils.getLoginFromToken("Token") ).thenReturn( Optional.of("user0") );
        Mockito.when(mockBase.getAccountInfo("user0")).thenReturn( user );
        Response response = authResource.getAccountInfo( "Bearer Token");

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( user, response.getEntity() );
    }

    @Test
    public void getAccountInfoByLoginTest() {
        Mockito.when(mockBase.getAccountInfo("user0") ).thenReturn( user );
        Response response = authResource.getAccountInfoByLogin("user0");

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( user, response.getEntity() );
    }

    @Test
    public void getAccountInfoByIdTest() {
        Mockito.when(mockBase.getAccountInfoById(0) ).thenReturn( user );
        Response response = authResource.getAccountInfoById(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( user, response.getEntity() );
    }


}