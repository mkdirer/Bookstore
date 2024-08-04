package backend.br_backend;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.*;

@Path("/openapi")
public class OpenApiResource {
    @GET
    @Path("/file")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response downloadFile() {

        InputStream inputStream = getClass().getResourceAsStream("/openapi.yaml");

        if (inputStream == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(inputStream, MediaType.APPLICATION_JSON).build();
    }
    @GET
    @Path("/download")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getOpenApiSpec() {
        InputStream inputStream = getClass().getResourceAsStream("/openapi.yaml");

        File file = new File("/api.yaml");

        try (OutputStream outputStream = new FileOutputStream(file)) {
            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=\"/api.yaml\"")
                .build();
    }
}
