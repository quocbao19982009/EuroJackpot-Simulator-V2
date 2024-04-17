FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
EXPOSE 8080

# copy csproj and restore as distinct layers
COPY . ./
RUN dotnet restore

RUN dotnet publish -c Release -o out

# build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0.2 AS runtime
WORKDIR /app
COPY --from=build-env /app/out .

ENTRYPOINT ["dotnet", "API.dll"]