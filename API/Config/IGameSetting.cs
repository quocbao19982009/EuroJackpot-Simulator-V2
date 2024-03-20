namespace API.Config;
public class GameSettings
{
    public int TicketPrice { get; set; }
    public int PrimaryNumberRange { get; set; }
    public int SecondaryNumberRange { get; set; }
    public int PrimaryNumberCount { get; set; }
    public int SecondaryNumberCount { get; set; }
    public int MaxTicketsPerUser { get; set; }
}