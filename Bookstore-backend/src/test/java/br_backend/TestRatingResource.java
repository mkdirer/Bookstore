package br_backend;

import backend.br_backend.RatingsResource;
import backend.model.Database;
import backend.model.Rating;
import jakarta.ws.rs.core.Response;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class TestRatingResource {


    private final Database mockBase = mock(Database.class);

    @InjectMocks
    private RatingsResource ratingsResource;

    private List<Rating> ratings;


    @Before
    public  void start() {
        Rating rat1, rat2;
        rat1 = new Rating(0, 0, 0, LocalDate.now(), 5, "comment1");
        rat2 = new Rating(1, 0, 0, LocalDate.now(), 4, "comment2");
        ratings = List.of(rat1, rat2);
    }


    @Test
    public void getAllTest() {
        Mockito.when( mockBase.getAllRatings() ).thenReturn(ratings);
        Response response = ratingsResource.getAll();

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals( ratings, response.getEntity());
    }

    @Test
    public void getAllByUserTest() {
        Mockito.when( mockBase.getAllRatingsByUser(0) ).thenReturn( List.of(ratings.get(0)) );
        Response response = ratingsResource.getAllByUser(0);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals( List.of(ratings.get(0)), response.getEntity());
    }

    @Test
    public void postRatingTest() {
        Mockito.when( mockBase.getAllRatingsByBook(0) ).thenReturn( List.of(ratings.get(1)) );
        Response response = ratingsResource.getAllByBook(0);

        assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
        assertEquals( List.of(ratings.get(1)), response.getEntity());
    }

}
