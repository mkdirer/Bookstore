package br_backend;


import backend.br_backend.BooksResource;
import backend.br_backend.RegisterResource;
import backend.model.Database;
import backend.model.User;
import jakarta.ws.rs.core.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class TestRegisterResource {

    private final Database mockBase = mock(Database.class);

    @InjectMocks
    private RegisterResource registerResource;

    private User user;

    @Before
    public void start() {
        user = new User(0, "login", "pass1", "fname1", "lname1", "mail1", "123321123", false, "avatar");
    }

    @Test
    public void registerShouldResponseConflictTest() {
        Mockito.when( mockBase.createUser(user) ).thenReturn(false);
        Response response = registerResource.post(user);

        assertEquals(Response.Status.CONFLICT.getStatusCode(), response.getStatus());
        assertEquals( "User already in database", response.getEntity());
    }

    @Test
    public void registerShouldResponseOkTest() {
        Mockito.when( mockBase.createUser(user) ).thenReturn(true);
        Response response = registerResource.post(user);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }

}