FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base

# Set working directory for the API
WORKDIR /app
# Expose port 8080 for the .NET application
# In production, the default port is 8080
EXPOSE 8080

# Use the SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["API.csproj", "./"]
RUN dotnet restore "API.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "API.csproj" -c Release -o /app/build


FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Copy the build output to the runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]
