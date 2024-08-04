package backend.br_backend;

import backend.model.Database;
import backend.model.OffersComment;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/offerscomment")
public class OffersCommentsResource {

    Database base;

    public OffersCommentsResource() {
        base = new Database();
    }

    public OffersCommentsResource(Database base) {
        this.base = base;
    }

    @GET
    @Path("/offer/{offerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOfferCommentsById(@PathParam("offerId") int offerId) {
        //Database data = new Database();
        List<OffersComment> list = base.getOffersCommentsById(offerId);
        return Response.ok(list).build();
    }

    @GET
    @Path("/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOfferCommentsByUserId(@PathParam("userId") int userId) {
        List<OffersComment> list = base.getOffersCommentsByUserId(userId);
        return Response.ok(list).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response post(OffersComment offersComment) {
        //Database data = new Database();
        base.createOffersComment(offersComment);
        return Response.status(Response.Status.CREATED).entity("Record added successfully!").build();
    }
}
