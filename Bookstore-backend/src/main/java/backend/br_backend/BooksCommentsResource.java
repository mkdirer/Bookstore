package backend.br_backend;

import backend.model.BooksComment;
import backend.model.Database;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/bookscomment")
public class BooksCommentsResource {

    Database base;

    public BooksCommentsResource() {
        base = new Database();
    }

    public BooksCommentsResource(Database base) {
        this.base = base;
    }

    @GET
    @Path("/book/{bookId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookCommentsById(@PathParam("bookId") int bookId) {
        //Database data = new Database();
        List<BooksComment> list = base.getBooksCommentsById(bookId);
        return Response.ok(list).build();
    }

    @GET
    @Path("/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookCommentsByUserId(@PathParam("userId") int userId) {
        List<BooksComment> list = base.getBooksCommentsByUserId(userId);
        return Response.ok(list).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response post(BooksComment booksComment) {
        //Database data = new Database();
        base.createBooksComment(booksComment);
        return Response.status(Response.Status.CREATED).entity("Record added successfully!").build();
    }
}
