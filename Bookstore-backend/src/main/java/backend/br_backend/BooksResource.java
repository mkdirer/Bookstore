package backend.br_backend;

import backend.model.AuthorizationToken;
import backend.model.Database;
import backend.model.Book;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/book")
public class BooksResource {

    Database base;

    public BooksResource() {
        base = new Database();
    }

    public BooksResource(Database base) {
        this.base = base;
    }

    private final String AUTHOR_PARAM = "author";
    private final String TITLE_PARAM = "title";

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllBooks() {
        //Database baza = new Database();
        List<Book> books = base.getBooksList();
        return Response.ok(books).build();
    }

    @POST
    @AuthorizationToken(isModerator = true)
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.TEXT_PLAIN})
    public Response post(Book book) {
        //Database data = new Database();
        base.createBook(book);
        return Response.status(Response.Status.CREATED).entity("Record added successfully!").build();
    }

    @GET
    @Path("/name/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookByTitle(@PathParam("name") final String title) {
        //Database baza = new Database();
        List<Book> books = base.searchBooksByNameOrAuthor(TITLE_PARAM, title);
        return Response.ok(books).build();
    }

    @GET
    @Path("/user/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookByUserId(@PathParam("userId") int userId) {
        List<Book> books = base.searchBooksByUserId(userId);
        return Response.ok(books).build();
    }

    @GET
    @Path("/rated/{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchRatedBookByUserId(@PathParam("userId") int userId) {
        List<Book> books = base.searchBooksRatedByUserId(userId);
        return Response.ok(books).build();
    }

    @GET
    @Path("/author/{author}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookByAuthor(@PathParam("author") final String author) {
        //Database baza = new Database();
        List<Book> books = base.searchBooksByNameOrAuthor(AUTHOR_PARAM, author);
        return Response.ok(books).build();
    }

    @GET
    @Path("/year/{year}&sort={sort}&page={page}&size={size}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookByYear(@PathParam("year") final String year, @PathParam("sort") final String sort, @PathParam("page") final Integer page, @PathParam("size") final Integer size) {
        List<Book> books = base.searchBooksByYear(year, sort, page, size);
        return Response.ok(books).build();
    }

    @GET
    @Path("/rating/{rating}&sort={sort}&page={page}&size={size}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookByRating(@PathParam("rating") final Integer rating, @PathParam("sort") final String sort, @PathParam("page") final Integer page, @PathParam("size") final Integer size) {
        List<Book.BookWithRating> books = base.searchBooksByRating(rating, sort, page, size);
        return Response.ok(books).build();
    }

    @GET
    @Path("/status/{status_value}")
    @AuthorizationToken()
    @Produces(MediaType.APPLICATION_JSON)
    public Response filterByStatus(@PathParam("status_value") final Integer status) {
        //Database base = new Database();
        List<Book> books = base.filterBooksByStatus(status);
        return Response.ok(books).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response searchBookById(@PathParam("id") final Integer id) {
        //Database base = new Database();
        Book book = base.searchBookById(id);
        return Response.ok(book).build();
    }
}
