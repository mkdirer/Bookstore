FROM tomee:9.0.0
EXPOSE 8081

COPY setup/context.xml /usr/local/tomee/webapps/manager/META-INF/context.xml
COPY setup/tomcat-users.xml /usr/local/tomee/conf/tomcat-users.xml