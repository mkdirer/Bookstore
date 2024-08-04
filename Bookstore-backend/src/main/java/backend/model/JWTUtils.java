package backend.model;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.ws.rs.core.Response;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JWTUtils {

    private static final String ACCESS_TOKEN_SECRET = "3f8c8a5f3bd380a3c0490827978976db0977d50b05322e92c615a403eab7d24ebbfa5024c863577f5ac79d7dab850358b77c324e9b23398868a7a97671590ef3";
    private static final String REFRESH_TOKEN_SECRET = "e6fd2bf6b37b143c5b12e8b55a41c8f6d529e17c6289dfc14b2228db35a39658b0e77e0f59060107ea8e0e600f0820b1ba5a090294f9b356eac1211a0ab9cae5";
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 900000;
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 24*60*60*1000;
    private static final Logger logger = Logger.getLogger(JWTUtils.class.getName());

    /**
     * Generates a new JWT and refresh token.
     *
     * @return A Response object containing the generated JWT and refresh token, or an error response with status 500.
     */
    public Response generateJWT(String login, boolean isModerator, int userId, String avatar) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);

            String token = JWT.create()
                    .withIssuer("Book Rating")
                    .withClaim("login", login)
                    .withClaim("isModerator", isModerator)
                    .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                    .sign(algorithm);

            String refreshToken = JWT.create()
                    .withIssuer("Book Rating")
                    .withClaim("login", login)
                    .withClaim("isModerator", isModerator)
                    .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                    .sign(Algorithm.HMAC256(REFRESH_TOKEN_SECRET));

            writeRefreshTokenToFile(refreshToken);

            logger.log(Level.INFO, "JWT generated");
            return Response.ok("{\"jwt\":\"" + token + "\", \"refreshToken\":\"" + refreshToken + "\"," +
                    "\"userId\":" + userId + "," + "\"avatar\":\"" + avatar + "\"}").build();

        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during JWT generation: " + e.getMessage());
            return Response.status(500).entity("error").build();
        }
    }

    /**
     * Refreshes the JWT based on the given refresh token.
     *
     * @param refreshToken The refresh token to be used for refreshing the JWT.
     * @return A Response object containing the refreshed JWT and the new refresh token, or an error response with status 403.
     */
    public Response refreshJWT(String refreshToken) {
        if (isRefreshTokenInFile(refreshToken)) {
            try {
                JWTVerifier verifier = JWT.require(Algorithm.HMAC256(REFRESH_TOKEN_SECRET)).build();
                DecodedJWT decodedRefreshToken = verifier.verify(refreshToken);

                String issuer = decodedRefreshToken.getIssuer();
                String login = decodedRefreshToken.getClaim("login").asString();
                boolean isModerator = decodedRefreshToken.getClaim("isModerator").asBoolean();

                if (!"Book Rating".equals(issuer)) {
                    return Response.status(403).entity("Invalid Refresh Token").build();
                }

                Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);

                String token = JWT.create()
                        .withIssuer("Book Rating")
                        .withClaim("login", login)
                        .withClaim("isModerator", isModerator)
                        .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                        .sign(algorithm);

                logger.log(Level.INFO, "JWT refreshed based on Refresh Token");
                return Response.ok(token).build();


            } catch (JWTVerificationException e) {
                logger.log(Level.SEVERE, "Error during Refresh Token verification", e);
                return Response.status(403).entity("Invalid Refresh Token").build();
            } catch (Exception e) {
                logger.log(Level.SEVERE, "Error during JWT refresh based on Refresh Token", e);
                return Response.status(403).entity("error").build();
            }
        } else {
            return Response.status(403).entity("Invalid Refresh Token").build();
        }
    }
    /**
     * Removes a refresh token from the file.
     *
     * @param refreshToken The refresh token to be removed.
     * @return true if the refresh token was successfully removed, false otherwise.
     */
    public boolean removeRefreshTokenFromFile(String refreshToken) {
        try {
            File file = new File("refreshTokens.txt");
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new FileReader(file));
                List<String> lines = new ArrayList<>();
                String line;
                while ((line = reader.readLine()) != null) {
                    if (!line.equals(refreshToken)) {
                        lines.add(line);
                    }
                }
                reader.close();
                BufferedWriter writer = new BufferedWriter(new FileWriter(file));
                for (String l : lines) {
                    writer.write(l);
                    writer.newLine();
                }
                writer.close();
                return true;
            } else {
                return false;
            }
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error removing Refresh Token from file", e);
            return false;
        }
    }

    /**
     * Writes a refresh token to the file.
     *
     * @param refreshToken The refresh token to be written.
     * @return true if the refresh token was successfully written, false otherwise.
     */
    public boolean writeRefreshTokenToFile(String refreshToken) {
        try {
            File file = new File("refreshTokens.txt");
            if (!file.exists()) {
                file.createNewFile();
            }
            BufferedWriter writer = new BufferedWriter(new FileWriter(file, true));
            writer.write(refreshToken);
            writer.newLine();
            writer.close();
            return true;
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error writing Refresh Token to file", e);
            return false;
        }
    }

    /**
     * Checks if a refresh token is present in the file.
     *
     * @param refreshToken The refresh token to be checked.
     * @return true if the refresh token is present in the file, false otherwise.
     */
    public boolean isRefreshTokenInFile(String refreshToken) {
        try {
            File file = new File("refreshTokens.txt");
            if (file.exists()) {
                BufferedReader reader = new BufferedReader(new FileReader(file));
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.equals(refreshToken)) {
                        reader.close();
                        return true;
                    }
                }
                reader.close();
            }
            return false;
        } catch (IOException e) {
            logger.log(Level.SEVERE, "Error reading Refresh Tokens file", e);
            return false;
        }
    }
    /**
     * Verifies the authenticity of a JSON Web Token (JWT).
     *
     * @param token             The JWT to be verified.
     * @param verifyModerator   If true, verifies if the user is a moderator based on the JWT claim.
     * @return                  True if the JWT is valid, false otherwise.
     */
    public boolean verifyJWT(String token, boolean verifyModerator) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);

            String issuer = decodedJWT.getIssuer();

            boolean isModerator = decodedJWT.getClaim("isModerator").asBoolean();

            if (!"Book Rating".equals(issuer)) {
                logger.log(Level.WARNING, "Invalid issuer in JWT: " + issuer);
                return false;
            }

            if (verifyModerator && !isModerator) {
                logger.log(Level.WARNING, "User is not a moderator");
                return false;
            }

            logger.log(Level.INFO, "JWT verified");
            return true;

        } catch (JWTVerificationException e) {
            logger.log(Level.SEVERE, "Error during JWT verification: " + e.getMessage());
            return false;
        }
    }

    public Optional<String> getLoginFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(ACCESS_TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);

            logger.log(Level.INFO, "Returned users login");
            return Optional.of(decodedJWT.getClaim("login").asString());
        } catch (JWTVerificationException e) {
            logger.log(Level.SEVERE, "Error during JWT verification: " + e.getMessage());
            return Optional.empty();
        }



    }
}