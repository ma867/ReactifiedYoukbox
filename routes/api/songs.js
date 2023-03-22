const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/songs')

router.get('/', dataController.index, apiController.index)

router.get('/spotifyIds/:userId', dataController.includeOnlySpotifyIds, apiController.index)

router.get('/:id', dataController.show, apiController.show)

router.delete('/:id/:userId', dataController.delete, apiController.show)

router.delete('/spotifyId/:spotifyId/:userId', dataController.deleteSpotifySong, apiController.show)

router.delete('/playlistId/:id/songId/:songId', dataController.deletePlaylistSong, apiController.show)

router.put('/:id', dataController.update, apiController.show)

router.post('/:userId', dataController.create, apiController.show)

router.post('/playlistSong/:playlistId/u/:userId', dataController.createPlaylistSong, apiController.show)


module.exports = router
