const Song = require('../../models/song')
const User = require('../../models/user')
const Playlist = require('../../models/playlist')

const dataController = {

  index(req, res, next) {
    Song.find({}, (err, foundSongs) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        // res.send({songs:foundSongs })
        res.locals.data.songs = foundSongs
        next()
      }
    })
  },
  includeOnlySpotifyIds(req, res, next) {
    Song.find({ spotify: true, userId: req.params.userId }, { spotifyId: 1, _id: 0 }, (err, foundSongs) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        // res.send({songs:foundSongs })
        res.locals.data.songs = foundSongs
        next()
      }
    })
  },

  update(req, res, next) {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.song = updatedSong
        next()
      }
    })
  },

  async create(req, res, next) {
    try {
      const user = await User.findById(req.params.userId)
      req.body.userId = req.params.userId
      req.body.artwork === '' ? req.body.artwork = 'https://i.imgur.com/0FUT9eJ.png' : req.body.artwork = req.body.artwork

      Song.create(req.body, (err, createdSong) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          user.songs.addToSet(createdSong._id)
          if (req.body.spotify === true) {
            user.spotifyIds.addToSet(createdSong.spotifyId)
          }
          user.save()
          res.locals.data.song = createdSong
          next()
        }
      })
    } catch {
      res.status(400).json('request didnt go through')
    }
  },
  async createPlaylistSong(req, res, next) {
    const playlist = await Playlist.findById(req.params.playlistId)
    req.body.userId = req.params.userId
    req.body.artwork === '' ? req.body.artwork = 'https://i.imgur.com/0FUT9eJ.png' : req.body.artwork = req.body.artwork

    Song.create(req.body, (err, createdSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        playlist.songs.addToSet(createdSong._id)
        playlist.save()
        res.locals.data.song = createdSong
        next()
      }
    })

  },
  async delete(req, res, next) {

    try {
      console.log(req.params.userId)
      const user = await User.findById(req.params.userId)
      Song.findByIdAndDelete(req.params.id, (err, deletedSong) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          if (deletedSong.spotify === true) {
            user.spotifyIds.remove(deletedSong.spotifyId)
            user.songs.remove(deletedSong._id)
          }
          user.save()
          res.locals.data.song = deletedSong
          next()
        }
      })

    }
    catch {
      res.status(400).json('request didnt go through')
    }

  },

  async deletePlaylistSong(req, res, next) {
    try {
      const playlist = await Playlist.findById(req.params.id)
      Song.findByIdAndDelete(req.params.songId, (err, deletedSong) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          playlist.songs.remove(deletedSong._id)
          playlist.save()
          res.locals.data.song = deletedSong
          next()
        }
      })

    }
    catch {
      res.status(400).json('request didnt go through')
    }

  },
  async deleteSpotifySong(req, res, next) {

    try {
      console.log(req.params.spotifyId)
      const user = await User.findById(req.params.userId)
      Song.findOneAndDelete({ userId: req.params.userId, spotifyId: req.params.spotifyId }, (err, deletedSong) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          if (deletedSong.spotify === true) {
            user.spotifyIds.remove(deletedSong.spotifyId)
          }
          user.songs.remove(deletedSong._id)
          user.save()
          res.locals.data.song = deletedSong
          next()
        }
      })

    }
    catch {
      res.status(400).json('request didnt go through')
    }

  },
  show(req, res, next) {
    Song.findById(req.params.id, (err, foundSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.song = foundSong
        next()
      }
    })
  }

}

const apiController = {
  index(req, res, next) {
    res.json(res.locals.data.songs)
  },
  show(req, res, next) {
    res.json(res.locals.data.song)
  }
}

module.exports = {
  apiController,
  dataController
}
