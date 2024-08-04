package backend.br_backend;

import backend.model.Database;
import backend.model.User;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/register")
public class RegisterResource {

    Database base;

    public RegisterResource() {
        base = new Database();
    }

    public RegisterResource(Database base) {
        this.base = base;
    }

    @POST
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response post(User user) {
        //Database base = new Database();
        Boolean added = base.createUser(user);
        if( added )
            return Response.status(Response.Status.OK).build();
        else
            return Response.status(Response.Status.CONFLICT).entity("User already in database").build();

    }

}
