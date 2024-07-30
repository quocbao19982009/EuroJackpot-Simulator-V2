# Veikkaus Simulator

This project is built using a variety of technologies for both the frontend and backend.

Demo: http://bao-nguyen-eb-test-env.eba-6r63puem.eu-north-1.elasticbeanstalk.com/

## Technologies Used

- Frontend: Typescript, React, Redux, React Query, Material-UI, React-Router-Dom, React Toastify
- Backend: C#, Dotnet 8, Entity Framework, SQL lite, JWT, Swagger
- Deployment: Docker, Render

## Running Locally

Running API:

1. Navigate to the `API` directory: `cd ./API`
2. Restore the dependencies: `dotnet restore`
3. Build the project: `dotnet build`
4. Run the project: `dotnet watch run --no-hot-reload`

The API will be available at `http://localhost:5000/swagger/index.html` (or as configured).

Running Frontend:

1. Navigate to the `clients` directory: `cd ./clients`
2. Install the dependencies: `npm install`
3. Start the project: `npm run dev`

The application will be available at `http://localhost:5173`.

## Running with Docker with docker compose

To run this project with Docker, you need to have Docker and Docker Compose installed on your machine. Once Docker is installed, you can build and run the Docker image:

1. Build the Docker image: `docker-compose up --build `

The application will be available at `http://localhost:8080`.

Please note that due to the constraints of the free tier and SQL Lite, the database does not retain information between sessions. Consequently, each time the server stops, all data is reset.
