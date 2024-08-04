package backend.model;

import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import java.io.IOException;
import java.lang.reflect.Method;

@Provider
@AuthorizationToken
public class AuthorizationTokenFilter implements ContainerRequestFilter {
    JWTUtils jwtUtils = new JWTUtils();

    @Context
    private ResourceInfo resourceInfo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        Method resourceMethod = resourceInfo.getResourceMethod();
        if (resourceMethod.isAnnotationPresent(AuthorizationToken.class)) {
            String authorizationHeader = requestContext.getHeaderString("Authorization");
            AuthorizationToken authorizationToken = resourceMethod.getAnnotation(AuthorizationToken.class);
            boolean isModerator = authorizationToken.isModerator();
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
                        .entity("Error: Invalid or missing token in the 'Authorization' header.").build());
            } else {
                String token = authorizationHeader.substring("Bearer ".length());
                System.out.println(token+"  "+"Ttttttttttt");
                if (!jwtUtils.verifyJWT(token, isModerator)) {
                    requestContext.abortWith(Response.status(Response.Status.FORBIDDEN)
                            .entity("Error: Invalid token or insufficient privileges.").build());
                }
            }
        }
    }
}
