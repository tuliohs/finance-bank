import React from "react";
//import { formulateMediaUrl } from "../lib/utils.js";
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from "@material-ui/core";
import { deepOrange, deepPurple, red } from "@material-ui/core/colors";

export const formulateMediaUrl = (
  mediaID,
) =>
  mediaID = "";

const Img = ({
  src,
  isThumbnail,
  classes,
  alt,
  defaultImage,
  address,
  isExternal = false,
  isAvatar
}) => {
  const colorClasses = [{
    backgroundColor: red[500],
  }, {
    color: '#fff',
    backgroundColor: deepOrange[500],
  }, {
    color: '#fff',
    backgroundColor: deepPurple[500],
  }]

  const source = src
    ? isExternal
      ? src
      : formulateMediaUrl(address.backend, src, isThumbnail)
    : defaultImage || "/logo_size_invert.jpg";
  return (
    <>
      {
        !isAvatar ?
          <img className={classes} src={source} alt={alt} />
          : <Avatar
            alt={alt}
            style={colorClasses[Math.floor(Math.random() * 3)]}
            //className={classes}
            src={src}
            children={alt?.charAt(0)}
          />
      }
      {/*<style jsx>{`
        img {
          width: 100%;
          height: auto;
        }
      `}</style>*/}
    </>
  );
};


export default Img
