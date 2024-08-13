# Step 1: Use an official Node runtime as a parent image
FROM node:16-alpine as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --legacy-peer-deps

# Step 5: Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the production build
FROM nginx:alpine

# Copy the production build from the build stage to the Nginx image
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
