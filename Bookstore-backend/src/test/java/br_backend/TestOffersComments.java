package br_backend;


import backend.br_backend.BooksResource;
import backend.br_backend.OffersCommentsResource;
import backend.model.Database;
import backend.model.OffersComment;
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
public class TestOffersComments {

    private final Database mockBase = mock(Database.class);

    @InjectMocks
    private OffersCommentsResource offersCommentsResource;

    private List<OffersComment> offersComments;

     @Before
     public void start() {
         OffersComment ofc1, ofc2;
         ofc1 = new OffersComment(0, 0, 0, "comment1", LocalDateTime.now(), "avatar1", "fname1", "lname1");
         ofc2 = new OffersComment(1, 0, 0, "comment2", LocalDateTime.now(), "avatar1", "fname1", "lname1");

         offersComments = List.of(ofc1, ofc2);
     }


    @Test
    public void postBookCommentTest() {
        Response response = offersCommentsResource.post( offersComments.get(0) );
        assertEquals( Response.Status.CREATED.getStatusCode(), response.getStatus() );
        assertEquals( "Record added successfully!", response.getEntity() );
    }

    @Test
    public void getOfferCommentsByIdTest() {
        Mockito.when( mockBase.getOffersCommentsById(0) ).thenReturn( offersComments );
        Response response = offersCommentsResource.getOfferCommentsById(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( offersComments, response.getEntity() );
    }

    @Test
    public void getOfferCommentsByUserIdTest() {
        Mockito.when( mockBase.getOffersCommentsByUserId(0) ).thenReturn( offersComments );
        Response response = offersCommentsResource.getOfferCommentsByUserId(0);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( offersComments, response.getEntity() );
    }

}