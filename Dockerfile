FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g supabase
RUN npm install

COPY . .

# Copy migrations to a specific directory inside the container
COPY ./migrations /usr/src/app/migrations

# Expose the port the app runs on
EXPOSE 3000

# Run migrations and start the server
CMD supabase db push && node index.js
