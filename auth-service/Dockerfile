# Pull node image
FROM node:18

# select working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app into container
COPY . .

# Compile and build the app
RUN npm run build

# Expose port
EXPOSE 7777

# Run app
CMD ["npm", "run start"]