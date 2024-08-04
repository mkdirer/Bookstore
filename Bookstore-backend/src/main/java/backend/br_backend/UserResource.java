package backend.br_backend;

import backend.model.AuthorizationToken;
import backend.model.Database;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/user")
public class UserResource {

    Database base;

    public UserResource() {
        base = new Database();
    }

    public UserResource(Database base) {
        this.base = base;
    }


    @POST
    @Path("/update/avatar/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    @AuthorizationToken()
    public Response updateAvatar(@PathParam("id") int id, JsonObject jsonObject) {
        Boolean updated = base.updateUserAvatar(id, jsonObject.getString("avatar"));
        if( updated )
            return Response.status(Response.Status.OK).build();
        else
            return Response.status(Response.Status.BAD_REQUEST).entity("Attempt to change the avatar was unsuccessful").build();
    }
}
