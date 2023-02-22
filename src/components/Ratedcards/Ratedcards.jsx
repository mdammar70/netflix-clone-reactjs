import React from "react";
import { Typography, Box } from "@mui/material";

import useStyles from "./style";
import Movie from "../Movie/Movie";

function RatedCards({ title, movies }) {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
