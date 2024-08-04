package backend.br_backend;

import backend.model.AuthorizationTokenFilter;
import backend.model.JWTUtils;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

import java.util.HashSet;
import java.util.Set;
@ApplicationPath("/api")
public class MainApplication extends Application {
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> set = new HashSet<Class<?>>();
        set.add(HelloResource.class);
        set.add(CorsFilter.class);
        set.add(BooksResource.class);
        set.add(AuthResource.class);
        set.add(JWTUtils.class);
        set.add(AuthorizationTokenFilter.class);
        set.add(RegisterResource.class);
        set.add(AdvertisementsResource.class);
        set.add(OpenApiResource.class);
        set.add(RatingsResource.class);
        set.add(BooksCommentsResource.class);
        set.add(OffersCommentsResource.class);
        set.add(UserResource.class);
        return set;
    }
}