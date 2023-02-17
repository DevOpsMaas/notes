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
EXPOSE 4000

# Run app
CMD ["node", "dist/index.js"]