FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-builder

# Set working directory for the API
WORKDIR /app

# Copy the .NET application files
COPY . ./

RUN dotnet restore

RUN dotnet publish -c Release -o out
COPY ./version.txt ./out

FROM mcr.microsoft.com/dotnet/aspnet:8.0.2 AS runtimecd
WORKDIR /app
COPY --from=api-builder /app/API/out .

# Start the .NET application
CMD ["dotnet", "API.dll"]
