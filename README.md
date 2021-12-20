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

`npm install`

## Build project

1. Build backend project

`mvn -U clean test package -pl :kemenu-backend`

2. Compile frontend

`npm --prefix kemenu-frontend run dev:ssr`

3. Launch acceptance tests

`mvn -U clean test -pl :kemenu-acceptance-tests`

4. How to launch docker

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

## How to run frontend

`cd ./kemenu-frontend && node dist/kemenu-frontend/server/main.js`

# Stack

* Angular 11 + Bootstrap
* Java 17 + Spring Boot
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
