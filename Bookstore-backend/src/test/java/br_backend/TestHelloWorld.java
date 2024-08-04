package br_backend;

import backend.br_backend.HelloResource;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;


@RunWith(MockitoJUnitRunner.class)
public class TestHelloWorld {

    private HelloResource helloResource = new HelloResource();

    @Test
    public void testHelloWorldResource() {
        String response = helloResource.hello();
        assertEquals("Hello, World!", response);
    }


}
