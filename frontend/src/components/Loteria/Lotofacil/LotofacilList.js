import React from "react";
import LotofacilItem from "./LotofacilItem";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  GridList: {
    width: "100%",
    height: "100vh"
  }
}));

function formataData(seconds) {
  var mData = moment(`/Date(${seconds}-0300)/`);
  return mData.format("DD/MM/YYYY");
}

function LotofacilList(props) {
  const classes = useStyles();
  if (props.jogos && props.jogos.success) {
    return (
      <GridList
        cellHeight={260}
        cols={6}
        spacing={10}
        className={classes.gridList}
      >
        {props.jogos.data.map(item => {
          return (
            <GridListTile key={item.id}>
              <LotofacilItem jogo={item} key={item.id} />
              <GridListTileBar
                title={`${item.id} - ${formataData(item.data._seconds)}`}
              />
            </GridListTile>
          );
        })}
      </GridList>
    );
  } else {
    return <p>Loading data</p>;
  }
}
export default LotofacilList;
