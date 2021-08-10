# kemenu

Kemenu web application, for menu management written in Java and Angular.

## Roadmap

1. Monetization
2. SEO
3. Admin panels
4. Home redesign
5. `/show` customization
6. Contact form

## IMPORTANT:exclamation:: Use npm as follows

:warning: Before running the frontend you have to compile the frontend:

`mvn -U clean install -pl :kemenu-frontend`

1. Hot reloading to work with frontend:

`bash kemenu-frontend/npm --prefix kemenu-frontend run start`

2. For use ng command:

`bash kemenu-frontend/npm --prefix kemenu-frontend run ng <NG_COMMAND>`

3. For install a npm package:

`bash kemenu-frontend/npm --prefix kemenu-frontend install <PACKAGE>`

## Build project

1. Build entire project

`mvn -U clean install -pl :kemenu-frontend && mvn -U clean test package -pl :kemenu-backend`

2. Compile frontend

`mvn -U clean install -pl :kemenu-frontend`

3. Compile backend

`mvn -U clean test package -pl :kemenu-backend`

4. Launch acceptance tests

`mvn -U clean test -pl :kemenu-acceptance-tests`

5. How to launch docker

`docker-compose up`

## How to run backend in local with Intellij IDEA

:warning: Before running the backend, you need to have the docker running with mongodb.

1. Go to `kemenu-backend/src/main/java/com/kemenu/kemenu_backend/Application.java`
2. Right click and click on `Debug 'Application'`
3. Stop it
4. Go to `Run` > `Edit Configurations...`
5. In the new window select `Spring Boot` > `Application` > `Environment`
6. Put in `VM options` the following `-Dspring.profiles.active=dev`
7. Click on `Apply` and then in `OK`

# Stack

* Angular 11 + Bootstrap
* Java 16 + Spring Boot
* MongoDB
* Docker

# Branch naming convention

A branch must be named following this convention:

* Start with KEM-[ISSUE_NUMBER]_[SHORT_DESCRIPTION]
* For example: `KEM-9_login_page`

# How to put a post

1. Put a route in `routes.txt` in `kemenu-frontend` in a new line.
2. Put the post in all of the languages (in spanish).
3. Go to `WebConfig.java` line 89 and add new controller line.