namespace api.Models
{
    public record Plant(
        string Id, 
        string Name, 
        string Type, 
        int WateringFrequencyDays, 
        DateTime LastWateredDate, 
        string Location
    );
}
