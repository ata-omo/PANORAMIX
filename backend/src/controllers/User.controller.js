import { User } from "../models/User.model.js";

const getFavourites = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.favourites });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

const addToFavourite = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { favourites } = user;
      const movieAlreadyLiked = favourites.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            favourites: [...user.favourites, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, favourites: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

const removeFromFavourite = async (req, res) => {

    // console.log("about to remove just wait...");
  try {
    let { email, movieId } = req.body;

    movieId =Number(movieId);

    // console.log("my type is ", typeof(movieId));
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.favourites;
      let movieIndex = -1.5;
      movieIndex = movies.findIndex(({ id }) => id === movieId);
    //   console.log("my type is ",typeof(movieIndex));
      if (movieIndex<0) {
        return res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          favourites: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};


export {removeFromFavourite, addToFavourite, getFavourites};