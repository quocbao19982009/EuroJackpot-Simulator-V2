# Stage 1: Build the React application
FROM node:20-alpine AS client-builder

# Set working directory for the client
WORKDIR /app/Clients

# Copy package.json and yarn.lock to install dependencies
COPY Clients/package.json Clients/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client application files
COPY Clients ./

# Build the React application
RUN npm run build

# Stage 2: Build the .NET application and serve the built client
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-builder

# Set working directory for the API
WORKDIR /app/API
# Expose port 8080 for the .NET application
EXPOSE 8080

# Copy the .NET application files
COPY API ./
# Delete the wwwroot folder from the API
RUN rm -rf ./wwwroot

# Copy the built client from the previous stage to the API's wwwroot folder
COPY --from=client-builder /app/API/wwwroot ./wwwroot

RUN dotnet restore

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0.2 AS runtime
WORKDIR /app/API
COPY --from=api-builder /app/API/out .

# Start the .NET application
CMD ["dotnet", "API.dll"]
