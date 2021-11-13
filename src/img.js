import { render } from '@testing-library/react';
import { OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover';
import Upload from './upload';

const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Upload></Upload>
      </Popover.Body>
    </Popover>
  );
  
  const Img = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <custombutton variant="success">🖼️</custombutton>
    </OverlayTrigger>
  );
  
  render(<Img />);
  export default Img;