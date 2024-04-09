namespace Exceptions.Game
{
    public class InvalidGameTypeException : Exception
    {
        public InvalidGameTypeException() : base("Invalid game type") { }
    }

    public class GameSaveFailException : Exception
    {
        public GameSaveFailException() : base("Failed to save the game") { }
    }

    public class InvalidTicketException : Exception
    {
        public InvalidTicketException() : base("Invalid ticket") { }
    }

}