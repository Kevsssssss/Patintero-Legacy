# 1. Use Node as the base
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files and install EVERYTHING (including devDependencies)
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your game code
COPY . .

# 5. Expose the port Webpack usually uses
EXPOSE 8080

# 6. Run the dev server with the host flag so Windows can see it
CMD ["npx", "webpack", "serve", "--config", "webpack/config.js", "--host", "0.0.0.0"]