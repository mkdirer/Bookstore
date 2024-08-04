package backend.br_backend;

import backend.model.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/rating")
public class RatingsResource {

    Database base;

    public RatingsResource() {
        base = new Database();
    }

    public RatingsResource(Database base) {
        this.base = base;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        //Database data = new Database();
        List<Rating> list = base.getAllRatings();
        return Response.ok(list).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response post(Rating rating) {
        //Database data = new Database();
        base.createRating(rating);
        return Response.status(Response.Status.CREATED).entity("Record added successfully!").build();
    }

    @GET
    @Path("/book/{bookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllByBook(@PathParam("bookId") int bookId) {
        //Database data = new Database();
        List<Rating> list = base.getAllRatingsByBook(bookId);
        return Response.ok(list).build();
    }

    @GET
    @Path("/user/{userId}")
    @AuthorizationToken()
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllByUser(@PathParam("userId") int userId) {
        //Database data = new Database();
        List<Rating> list = base.getAllRatingsByUser(userId);
        return Response.ok(list).build();
    }
}
