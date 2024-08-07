FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-builder

# Set working directory for the API
WORKDIR /app/API
# Expose port 8080 for the .NET application
EXPOSE 8080

# Copy the .NET application files
COPY API ./

RUN dotnet restore

RUN dotnet publish -c Release -o out
COPY API/version.txt ./out

FROM mcr.microsoft.com/dotnet/aspnet:8.0.2 AS runtime
WORKDIR /app/API
COPY --from=api-builder /app/API/out .


# Start the .NET application
CMD ["dotnet", "API.dll"]
