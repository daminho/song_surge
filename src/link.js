import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';

const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <input type="text" placeholder="drop link"></input>
      </Popover.Body>
    </Popover>
  );
  
  const Link = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <custombutton variant="success">🎵</custombutton>
    </OverlayTrigger>
  );
  

  export default Link;