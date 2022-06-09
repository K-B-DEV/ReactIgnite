import { assertTSExpressionWithTypeArguments } from "@babel/types";
import axios from "axios";
import { gameDetailsUrl, gameScreenShotUrl } from "../api";
export const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: "LOADING_DETAIL",
  });

  const detailData = await axios.get(gameDetailsUrl(id));
  const screenShotData = await axios.get(gameScreenShotUrl(id));
  dispatch({
    type: "GET_DETAIL",
    payload: {
      game: detailData.data,
      screen: screenShotData.data,
    },
  });
};
