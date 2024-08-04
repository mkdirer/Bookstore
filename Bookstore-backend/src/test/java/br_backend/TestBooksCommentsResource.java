package br_backend;


import backend.br_backend.BooksCommentsResource;
import backend.model.BooksComment;
import backend.model.Database;
import jakarta.ws.rs.core.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class TestBooksCommentsResource {

    private final Database mockBase = mock(Database.class);

    @InjectMocks
    private BooksCommentsResource booksCommentsResource;

    private List<BooksComment> bookComments;


     @Before
     public void start() {
         BooksComment bcom1, bcom2;
         bcom1 = new BooksComment(0, 0, 0, "Good", LocalDateTime.now(), "avatar1", "fname1", "lname1");
         bcom2 = new BooksComment(1, 0, 0, "Bad", LocalDateTime.now(), "avatar1", "fname1", "lname1");
         bookComments = List.of( bcom1, bcom2 );
     }

     @Test
     public void getBookCommentsByIdTest() {
         Mockito.when( mockBase.getBooksCommentsById(0) ).thenReturn( bookComments );
         Response response = booksCommentsResource.getBookCommentsById(0);

         assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
         assertEquals( bookComments, response.getEntity() );
     }

    @Test
    public void getBookCommentsByUserIdTest() {
        Mockito.when( mockBase.getBooksCommentsByUserId(0) ).thenReturn( bookComments );
        Response response = booksCommentsResource.getBookCommentsByUserId(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( bookComments, response.getEntity() );
    }

     @Test
     public void postBookCommentTest() {
         Response response = booksCommentsResource.post( bookComments.get(0) );
         assertEquals( Response.Status.CREATED.getStatusCode(), response.getStatus() );
         assertEquals( "Record added successfully!", response.getEntity() );
     }

}