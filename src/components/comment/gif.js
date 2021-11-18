import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Carousel,
} from "@giphy/react-components";
import React from "react";


const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

  function CarouselDemo() {
    const fetchGifs = (offset) =>
    giphyFetch.trending({ offset, limit: 10 });
    return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
  }
const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
      <CarouselDemo></CarouselDemo>
      </Popover.Body>
    </Popover>
  );
  
  const GifB = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <custombutton variant="success">🎞️</custombutton>
    </OverlayTrigger>
  );
  
  
  export default GifB;