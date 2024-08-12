using Newtonsoft.Json; // Asegúrate de que este using esté presente

public class GameService
{
    private readonly string filePath = "games.json";
    private List<Game> games;

    public GameService()
    {
        // Cargar los juegos desde el archivo JSON al iniciar
        if (File.Exists(filePath))
        {
            var json = File.ReadAllText(filePath);
            games = JsonConvert.DeserializeObject<List<Game>>(json) ?? new List<Game>();
        }
        else
        {
            games = new List<Game>();
        }
    }

    public List<Game> GetAllGames()
    {
        return games;
    }

    public Game GetGameById(int id)
    {
        return games.FirstOrDefault(g => g.Id == id);
    }

    public void AddGame(Game newGame)
    {
        newGame.Id = games.Count > 0 ? games.Max(g => g.Id) + 1 : 1;
        games.Add(newGame);
        SaveChanges(); // Guardar cambios en el archivo JSON
    }

    public void UpdateGame(int id, Game updatedGame)
    {
        var game = games.FirstOrDefault(g => g.Id == id);
        if (game != null)
        {
            game.Name = updatedGame.Name;
            game.Description = updatedGame.Description;
            game.ImageUrl = updatedGame.ImageUrl;
            SaveChanges(); // Guardar cambios en el archivo JSON
        }
    }

    public void DeleteGame(int id)
    {
        var game = games.FirstOrDefault(g => g.Id == id);
        if (game != null)
        {
            games.Remove(game);
            SaveChanges(); // Guardar cambios en el archivo JSON
        }
    }

    // Método SaveChanges para guardar los datos en el archivo JSON
    private void SaveChanges()
    {
        var json = JsonConvert.SerializeObject(games, Formatting.Indented);
        File.WriteAllText(filePath, json);
    }
}
