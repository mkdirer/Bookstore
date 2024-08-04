package backend.br_backend;

import backend.model.Advertisement;
import backend.model.AuthorizationToken;
import backend.model.Database;
import backend.requests.AdvertisementPrototype;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;

@Path("/advertisement")
public class AdvertisementsResource {

    Database base;
    public AdvertisementsResource() { base = new Database(); }
    public AdvertisementsResource(Database base) {
        this.base = base;
    }

    @POST
    @AuthorizationToken()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response post(AdvertisementPrototype advProto) {
        Advertisement advertisement = new Advertisement();
        advertisement.setBookId(advProto.getBookId());
        advertisement.setMessage(advProto.getMessage());
        advertisement.setType(advProto.getType());
        advertisement.setUserId(advProto.getUserId());
        advertisement.setId(0);
        advertisement.setStatus("none");
        advertisement.setReceiverId(0);
        advertisement.setPrice(0.);
        advertisement.setDateAdded(LocalDate.now());
        //Database data = new Database();
        base.createAdvertisement(advertisement);
        return Response.status(Response.Status.CREATED).entity("Advertisement record added successfully!").build();
    }

    @Path("/{id}")
    @PATCH
    @AuthorizationToken()
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response update(@PathParam("id") Integer id, Advertisement newAdvertisement) {
        //Database data = new Database();
        base.updateAdvertisement(id, newAdvertisement);
        return Response.status(Response.Status.OK).entity("Advertisement record updated successfully!").build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        //Database data = new Database();
        List<Advertisement> list = base.getAllAdvertisements();
        return Response.ok(list).build();
    }

    @Path("/page={page}&size={size}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllWithPagination(@PathParam("page") Integer page, @PathParam("size") Integer size) {
        //Database data = new Database();
        List<Advertisement> list = base.getAllAdvertisementsWithPagination(page, size);
        return Response.ok(list).build();
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOne(@PathParam("id") Integer id) {
        //Database data = new Database();
        Advertisement ad = base.getOneAdvertisement(id);
        return Response.ok(ad).build();
    }
}
