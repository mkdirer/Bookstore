package br_backend;

import backend.br_backend.BooksResource;
import backend.model.Book;
import backend.model.Database;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import jakarta.ws.rs.core.Response;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class TestBooksResource {

    private final Database mockBase = mock(Database.class);

    private List<Book> books;

    @InjectMocks
    private BooksResource booksResource;

    @Before
    public void init() {
        booksResource = new BooksResource( mockBase );
        Book book1 = new Book(0, "isbn1", "author1","title1", 1, "publisher1", "domain1");
        Book book2 = new Book(1, "isbn2", "author2","title2", 2, "publisher2", "domain2");
        books = List.of(book1, book2);
    }

    @Test
    public void getAllBooksTest() {
        Mockito.when(mockBase.getBooksList()).thenReturn(books);
        Response response = booksResource.getAllBooks();

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( books, response.getEntity());
    }


    @Test
    public void postBookTest() {
        Mockito.doNothing().when(mockBase).createBook(books.get(0));
        Response response = booksResource.post(books.get(0));

        assertEquals( Response.Status.CREATED.getStatusCode(), response.getStatus() );
        assertEquals( "Record added successfully!", response.getEntity() );
    }

    @Test
    public void filterByStatusTest() {
        Mockito.when(mockBase.filterBooksByStatus(0)).thenReturn( List.of(books.get(1)) );
        Response response = booksResource.filterByStatus(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( List.of(books.get(1)), response.getEntity() );
    }

    @Test
    public void searchBookByIdTest() {
        Mockito.when( mockBase.searchBookById(0) ).thenReturn( books.get(1) );
        Response response = booksResource.searchBookById(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( books.get(1), response.getEntity() );
    }

    @Test
    public void searchBookByRatingTest() {
        Mockito.when( mockBase.searchBooksByYear("2000", "lower", 1, 2) ).thenReturn( books );
        Response response = booksResource.searchBookByYear("2000", "lower", 1, 2);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( books, response.getEntity() );
    }

    @Test
    public void searchBookByAuthorTest() {
        Mockito.when( mockBase.searchBooksByNameOrAuthor("author", "author1") ).thenReturn( List.of(books.get(0)) );
        Response response = booksResource.searchBookByAuthor("author1");

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( List.of(books.get(0)), response.getEntity() );
    }

    @Test
    public void searchBookByTitleTest() {
        Mockito.when( mockBase.searchBooksByNameOrAuthor("title", "title1") ).thenReturn( List.of(books.get(0)) );
        Response response = booksResource.searchBookByTitle("title1");

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( List.of(books.get(0)), response.getEntity() );
    }

}
