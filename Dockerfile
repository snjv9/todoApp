# Start from the official Node.js LTS (Long Term Support) image
FROM node:lts

# Set the working directory in the Docker image
WORKDIR /todoApp

# Copy package.json and package-lock.json into the image
COPY package*.json ./

# Install dependencies in the image
RUN npm install

# Copy the rest of the application into the image
COPY . .

# Expose port your app uses 
EXPOSE 8000

CMD ["npm","start"]