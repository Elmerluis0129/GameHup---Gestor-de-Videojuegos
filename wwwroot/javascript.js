let currentPage = 1;
const itemsPerPage = 6;
let allGames = []; // Variable global para almacenar todos los juegos

// Función para mostrar mensajes de error en la interfaz
function showError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
}

// Función para ocultar los mensajes de error
function hideError() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.style.display = 'none';
}

// Función para mostrar mensajes de éxito en la interfaz
function showSuccess(message) {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = message;
    successMessageElement.style.display = 'block';
}

// Función para ocultar los mensajes de éxito
function hideSuccess() {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.style.display = 'none';
}

// Abre el modal con la descripción del juego
function openModal(game) {
    document.getElementById('modal-game-name').innerText = game.name;
    document.getElementById('modal-game-image').src = game.imageUrl;
    document.getElementById('modal-game-description').innerText = game.description;

    // Configura el evento de los botones
    document.getElementById('edit-button').onclick = function() {
        editGame(game.id);
    };
    
    document.getElementById('delete-button').onclick = function() {
        deleteGame(game.id);
    };

    document.getElementById('gameModal').style.display = 'block';
}

// Función para editar un juego
function editGame(gameId) {
    loadGame(gameId); // Cargar los datos del juego en el formulario
    document.getElementById('gameModal').style.display = 'none'; // Cerrar el modal
}

// Función para eliminar un juego
async function deleteGame(gameId) {
    hideError();   // Ocultar mensajes de error anteriores
    hideSuccess(); // Ocultar mensajes de éxito anteriores

    try {
        const response = await fetch(`http://localhost:5016/api/Games/${gameId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showSuccess('Juego eliminado exitosamente');
            fetchGames(); // Refrescar la lista de juegos
        } else if (response.status === 401) {
            showError('No autorizado. No tienes permiso para eliminar este juego.');
        } else {
            showError(`Error: ${response.statusText}`);
        }
    } catch (error) {
        showError('Error al intentar conectar con el servidor.');
        console.error('Fetch error:', error);
    }
}

// Cerrar el modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Asignar evento al botón de cierre del modal
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.modal .close').addEventListener('click', closeModal);

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('gameModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cargar juegos al cargar la página
    fetchGames();
});

// Función para renderizar los juegos con paginación
function renderGames(games) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const gamesToDisplay = games.slice(startIndex, endIndex);

    const gamesContainer = document.querySelector('.games-container');
    gamesContainer.innerHTML = '';

    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="game-header" onclick='openModal(${JSON.stringify(game)})'>
                <img src="${game.imageUrl}" alt="${game.name}" />
                <h3>${game.name}</h3>
            </div>
        `;
        gamesContainer.appendChild(gameCard);
    });

    renderPagination(games);
}

// Función para renderizar los botones de paginación
function renderPagination(games) {
    const totalPages = Math.ceil(games.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination-container');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderGames(games);
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Función para obtener los juegos de la API y mostrarlos con paginación
async function fetchGames() {
    try {
        const response = await fetch('http://localhost:5016/api/Games');
        const games = await response.json();

        allGames = games; // Guarda los juegos obtenidos en la variable global
        renderGames(games); // Renderiza los juegos con paginación
    } catch (error) {
        showError('Error al obtener los juegos. Por favor, intenta nuevamente.');
        console.error('Error al obtener los juegos:', error);
    }
}

// Función para filtrar juegos por nombre
function filterGames() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    const filteredGames = allGames.filter(game => 
        game.name.toLowerCase().includes(searchTerm)
    );

    renderGames(filteredGames); // Renderiza los juegos filtrados
}

// Función para cargar los datos de un juego en el formulario para su edición
async function loadGame(gameId) {
    try {
        const response = await fetch(`http://localhost:5016/api/Games/${gameId}`);
        const game = await response.json();

        document.getElementById('game-id').value = game.id;
        document.getElementById('game-name').value = game.name;
        document.getElementById('game-description').value = game.description;
        document.getElementById('game-image').value = game.imageUrl;

        // Cambiar el texto del botón a "Editar Juego"
        document.querySelector('#game-form button').textContent = 'Editar Juego';

        // Desplazarse hacia el formulario
        document.getElementById('add-game').scrollIntoView({ behavior: 'smooth' });

        // Actualizar la previsualización de la imagen
        updateImagePreview(game.imageUrl);
    } catch (error) {
        showError('Error al cargar el juego. Por favor, intenta nuevamente.');
        console.error('Error al cargar el juego:', error);
    }
}

// Función para añadir o actualizar un juego a través de la API
async function submitGame(event) {
    event.preventDefault();

    hideError();   // Ocultar mensajes de error anteriores
    hideSuccess(); // Ocultar mensajes de éxito anteriores

    const gameId = document.getElementById('game-id').value;
    const name = document.getElementById('game-name').value;
    const description = document.getElementById('game-description').value;
    const imageUrl = document.getElementById('game-image').value;

    const method = gameId ? 'PUT' : 'POST';
    const url = gameId ? `http://localhost:5016/api/Games/${gameId}` : 'http://localhost:5016/api/Games';

    console.log('Submitting game with the following details:');
    console.log('Game ID:', gameId);
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Image URL:', imageUrl);
    console.log('HTTP Method:', method);
    console.log('API URL:', url);

    if (!name || !description || !imageUrl) {
        showError('Todos los campos son obligatorios.');
        console.log('Error: Todos los campos son obligatorios.');
        return;
    }
    
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(imageUrl)) {
        showError('La URL de la imagen no es válida.');
        console.log('Error: La URL de la imagen no es válida.');
        return;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                imageUrl: imageUrl
            })
        });

        console.log('API Response Status:', response.status);
        console.log('API Response OK:', response.ok);

        if (response.ok) {
            if (method === 'POST') {
                showSuccess('Juego añadido exitosamente');
                console.log('Success: Juego añadido exitosamente');
            } else {
                showSuccess('Juego editado exitosamente');
                console.log('Success: Juego editado exitosamente');
            }
            fetchGames(); // Refrescar la lista de juegos
            document.getElementById('game-form').reset(); // Resetear el formulario
            document.getElementById('image-preview').style.display = 'none'; // Ocultar la previsualización
            
            document.querySelector('#game-form button').textContent = 'Añadir Juego';

        } else if (response.status === 401) {
            showError('No autorizado. Por favor, verifica tus credenciales.');
            console.log('Error: No autorizado. Por favor, verifica tus credenciales.');
        } else {
            showError(`Error: ${response.statusText}`);
            console.log(`Error: ${response.statusText}`);
        }
    } catch (error) {
        showError('Error al intentar conectar con el servidor.');
        console.error('Fetch error:', error);
    }
}

// Función para actualizar la previsualización de la imagen
function updateImagePreview(imageUrl) {
    const previewTextElement = document.getElementById('preview-text');
    const previewImage = document.getElementById('image-preview');

    previewTextElement.textContent = 'Previsualización:';

    if (imageUrl) {
        previewImage.src = imageUrl;
        previewImage.style.display = 'block';
    } else {
        previewImage.style.display = 'none';
    }
}

// Evento para previsualizar la imagen al ingresar la URL
document.getElementById('game-image').addEventListener('input', function() {
    updateImagePreview(this.value);
});
