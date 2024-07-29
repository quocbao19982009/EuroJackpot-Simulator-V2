namespace API.Endpoints.Health.Get;
public class Response
{
    public bool isBackendHealthy { get; set; } = false;
    public bool isDatabaseHealthy { get; set; } = false;
    public string DatabaseServer { get; set; } = "";
}