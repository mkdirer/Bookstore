package br_backend;

import backend.br_backend.AdvertisementsResource;
import backend.model.Advertisement;
import backend.model.Book;
import backend.model.Database;
import backend.requests.AdvertisementPrototype;
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
public class TestAdvertisementResource {


    private final Database mockBase = mock(Database.class);

    private List<AdvertisementPrototype> advertisementsPrototypes;

    private List<Advertisement> advertisements;

    @InjectMocks
    private AdvertisementsResource advertisementsResource;


    @Before
    public void start() {
        Advertisement ad1, ad2, ad3;
        AdvertisementPrototype adp1, adp2, adp3;

        ad1 = new Advertisement( 0, 0, 0, LocalDate.now(), "message1", "type1", 0, 50.0, null, "status1" );
        ad2 = new Advertisement( 1, 0, 0, LocalDate.now(), "message2", "type1", 0, 50.0, null, "status2" );
        ad3 = new Advertisement( 2, 0, 0, LocalDate.now(), "message3", "type2", 0, 50.0, null, "status1" );

        adp1 = new AdvertisementPrototype( 0, "message1", "type1", 0 );
        adp2 = new AdvertisementPrototype( 0, "message1", "type1", 0 );
        adp3 = new AdvertisementPrototype( 0, "message1", "type2", 0 );

        advertisementsPrototypes = List.of( adp1, adp2, adp3 );
        advertisements = List.of( ad1, ad2, ad3 );
    }

    @Test
    public void postAdvertisementTest() {
        Response response = advertisementsResource.post( advertisementsPrototypes.get(0) );

        assertEquals( Response.Status.CREATED.getStatusCode(), response.getStatus() );
        assertEquals( "Advertisement record added successfully!", response.getEntity() );
    }

    @Test
    public void updateAdvertisementTest() {
        Response response = advertisementsResource.update(0, advertisements.get(0) );

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( "Advertisement record updated successfully!", response.getEntity() );
    }

    @Test
    public void getAllTest() {
        Mockito.when(mockBase.getAllAdvertisementsWithPagination(1, 3) ).thenReturn( advertisements );
        Response response = advertisementsResource.getAllWithPagination(1, 3);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( advertisements, response.getEntity() );
    }

    @Test
    public void getOneTest() {
        Mockito.when(mockBase.getOneAdvertisement(1) ).thenReturn( advertisements.get(1) );
        Response response = advertisementsResource.getOne(1);

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertEquals( advertisements.get(1), response.getEntity() );
    }


}
