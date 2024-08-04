FROM tomcat:11.0
EXPOSE 8081

COPY setup/context.xml /usr/local/tomcat/webapps/manager/META-INF/context.xml
COPY setup/tomcat-users.xml /usr/local/tomcat/conf/tomcat-users.xml