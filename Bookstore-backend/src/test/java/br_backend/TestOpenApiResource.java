package br_backend;

import backend.br_backend.BooksResource;
import backend.br_backend.OpenApiResource;
import backend.model.Book;
import backend.model.Database;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

@RunWith(MockitoJUnitRunner.class)
public class TestOpenApiResource {


    private OpenApiResource openApiResource = new OpenApiResource();


    @Test
    public void downloadFileTest() {
        Response response = openApiResource.downloadFile();

        assertEquals( Response.Status.OK.getStatusCode(), response.getStatus() );
        assertNotEquals( null, response.getEntity() );
    }
}
