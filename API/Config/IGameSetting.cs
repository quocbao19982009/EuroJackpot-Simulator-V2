namespace API.Config;

public class GameSettings
{
    public string Name { get; set; } = string.Empty;
    public int TicketPrice { get; set; }
    public int PrimaryNumberRange { get; set; }
    public int SecondaryNumberRange { get; set; }
    public int PrimaryNumberCount { get; set; }
    public int SecondaryNumberCount { get; set; }
    public int MaxTicketsPerUser { get; set; }
    public int JackpotAmount { get; set; }
}

public class GameSettingsOptions
{
    public GameSettings Eurojackpot { get; set; } = new GameSettings();
    public GameSettings Lotto { get; set; } = new GameSettings();
}

public enum GameType
{
    Eurojackpot,
    Lotto
}