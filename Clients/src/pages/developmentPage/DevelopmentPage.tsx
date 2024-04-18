import { Box, Typography } from "@mui/material";

const DevelopmentPage = () => {
  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h4" gutterBottom>
        Development Page
      </Typography>

      <Typography variant="h6" gutterBottom>
        Technologies Used
      </Typography>
      <Typography variant="body1">
        This application employs a variety of technologies for both the frontend
        and backend:
      </Typography>
      <ul>
        <li>
          Frontend: Typescript, React, Redux, React Query, Material-UI,
          React-Router-Dom, React Toastify
        </li>
        <li>Backend: C#, Dotnet 8, Entity Framework, SQL lite, JWT, Swagger</li>
        <li>
          Deployment: Docker,{" "}
          <a
            href="https://render.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Render
          </a>{" "}
        </li>{" "}
        <li>
          <span style={{ fontWeight: "bold" }}>Note</span>: Please be aware that
          due to the constraints of the free tier and SQL Lite, the database
          does not retain information between sessions. Consequently, each time
          the server stop, all data is reset. 😅
        </li>
      </ul>

      <Typography variant="h6" gutterBottom>
        Features
      </Typography>
      <Typography variant="body1">
        The application boasts several notable features:
      </Typography>
      <ul>
        <li>
          Responsive Design: Material UI provides a sophisticated responsive
          design for the application, adhering to its principles to ensure
          responsiveness.
        </li>
        <li>
          Theme changing with different Game Types: Depending on the game type,
          the theme dynamically adjusts, altering the color scheme of number
          selections, lottery displays, and tickets.
        </li>
        <li>
          User Authentication: Users remain logged in after refreshing the page,
          thanks to JWT stored in local storage. In the event of refresh failure
          or expired tokens, users are redirected to the login page with token
          deletion.
        </li>
        <li>
          Ticket Purchase, Validation, History, and Balance Top-Up: Users can
          seamlessly purchase and validate tickets, view their transaction
          history, and manage their balances, with all data fetched from the
          backend.
        </li>
        <li>
          Ticket Persistence: Ticket data is preserved in local storage,
          ensuring retrieval after page refreshes when selecting the game type.
        </li>
        <li>
          Ticket Validation: All API requests undergo thorough validation both
          in the Backend and the Frontend.
        </li>
      </ul>

      <Typography variant="h6" gutterBottom>
        Development Process
      </Typography>
      <Typography variant="body1">
        The development process entailed the strategic utilization of various
        tools and technologies, each chosen for its specific strengths and
        capabilities. Iterative in nature, the process involved continuous
        feature addition and refinement over time.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Approach
      </Typography>
      <Typography variant="body1">
        The application is architected with scalability at its core,
        facilitating seamless integration of additional games. Expansion merely
        requires the addition of game types and adjustments to the theme's color
        palette.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Areas for Improvement
      </Typography>
      <Typography variant="body1">
        Noteworthy areas for enhancement include:
      </Typography>
      <ul>
        <li>Implementation of i18n for multi-language support.</li>
        <li>Augmentation of unit and integration testing coverage.</li>
        <li>
          Strengthening of error handling and validation mechanisms in the
          frontend.
        </li>
        <li>
          Incorporation of designer or UI/UX input to enhance aesthetic appeal.
        </li>
      </ul>

      <Typography variant="h6" gutterBottom>
        Future Initiatives
      </Typography>
      <Typography variant="body1">Planned future features include:</Typography>
      <ul>
        <li>
          Development of an administrative interface for managing users, games,
          tickets, and balances.
        </li>
      </ul>
    </Box>
  );
};

export default DevelopmentPage;
