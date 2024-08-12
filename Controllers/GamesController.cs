using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;

    // Constructor para inyectar el servicio de juegos
    public GamesController(GameService gameService)
    {
        _gameService = gameService;
    }

    // Obtener todos los juegos
    [HttpGet]
    public ActionResult<IEnumerable<Game>> GetGames()
    {
        var games = _gameService.GetAllGames();
        return Ok(games);
    }

    // Obtener un juego por ID
    [HttpGet("{id}")]
    public ActionResult<Game> GetGame(int id)
    {
        var game = _gameService.GetGameById(id);
        if (game == null)
        {
            return NotFound();
        }
        return Ok(game);
    }

    // Crear un nuevo juego
    [HttpPost]
    public ActionResult<Game> CreateGame(Game game)
    {
        _gameService.AddGame(game);
        return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
    }

    // Actualizar un juego existente
    [HttpPut("{id}")]
public IActionResult UpdateGame(int id, Game updatedGame)
{
    var game = _gameService.GetGameById(id);
    if (game == null)
    {
        return NotFound();
    }

    _gameService.UpdateGame(id, updatedGame);
    return NoContent();
}


    // Eliminar un juego
    [HttpDelete("{id}")]
    public IActionResult DeleteGame(int id)
    {
        var existingGame = _gameService.GetGameById(id);
        if (existingGame == null)
        {
            return NotFound();
        }

        _gameService.DeleteGame(id);
        return NoContent();
    }
}
