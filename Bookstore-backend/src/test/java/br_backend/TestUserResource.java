package br_backend;


import backend.br_backend.RegisterResource;
import backend.br_backend.UserResource;
import backend.model.Database;
import backend.model.User;
import jakarta.json.Json;
import jakarta.json.JsonObject;
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
public class TestUserResource {


    private final Database mockBase = mock(Database.class);

    @InjectMocks
    private UserResource userResource;

    private JsonObject avatarUpdateData;

    private JsonObject badAvatarUpdateData;

    @Before
    public void start() {
        avatarUpdateData = Json.createObjectBuilder()
                .add("avatar", "avatar1")
                .build();

        badAvatarUpdateData = Json.createObjectBuilder()
                .add("avatar", "avatar1_bad")
                .build();
    }


    @Test
    public void updateAvatarShouldResponseBadRequestTest() {
        Mockito.when( mockBase.updateUserAvatar(0, "avatar1_bad") ).thenReturn(false);
        Response response = userResource.updateAvatar(0, badAvatarUpdateData);

        assertEquals(Response.Status.BAD_REQUEST.getStatusCode(), response.getStatus());
        assertEquals( "Attempt to change the avatar was unsuccessful", response.getEntity());
    }

    @Test
    public void updateAvatarShouldResponseOkTest() {
        Mockito.when( mockBase.updateUserAvatar(0, "avatar1") ).thenReturn(true);
        Response response = userResource.updateAvatar(0, avatarUpdateData);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
    }



}
