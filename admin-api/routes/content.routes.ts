export {}
const Router = require('express');
const router = new Router();
const playlistController = require('../controllers/content/playlist.controller');
const songController = require('../controllers/content/song.controller')

router.get('/playlist', playlistController.getPlaylists) // TODO: offset limit
router.get('/playlist/:id', playlistController.getPlaylistByID)
router.post('/playlist', playlistController.addPlaylist)
router.put('/playlist', playlistController.updatePlaylist)
router.delete('/playlist/:id', playlistController.deletePlaylistByID)
router.get('/playlist/:id/songs', playlistController.getSongsFromPlaylistByID)
router.delete('/playlist/:idP/song/:idS', playlistController.removeSongFromPlaylistByID)
router.get('/playlist/title/:title', playlistController.getPlaylistsByTitle)

router.get('/song', songController.getSongs)
router.get('/song/:id', songController.getSongByID)
router.post('/song', songController.addSong)
router.put('/song', songController.updateSong)
router.delete('/song/:id', songController.deleteSongByID)
router.post('/song/:idS/playlist/:idP', songController.addSongToPlaylistByID)
router.get('/song/name/:name', songController.getSongsByName)

module.exports = router;