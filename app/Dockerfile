### STAGE 1:BUILD ###

# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies 
# This is needed to build and compile our code 
# while generating the docker image
FROM node:18.10.0 as build


# Create a Virtual directory inside the docker image
WORKDIR /app

# Copy files from local machine to virtual directory in docker image
COPY . .

# Install all the dependencies
RUN npm install
#Generate the build of the application
RUN npm run build 

### STAGE 2:RUN ###

# Defining nginx image to be used
FROM nginx:1.22.1-alpine


# NOTE: This path may change according to your project's output folder 
COPY --from=build /app/dist/notes-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80
