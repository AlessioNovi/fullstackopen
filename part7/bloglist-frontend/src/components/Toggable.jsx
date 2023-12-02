import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const Toggable = forwardRef((props, refs) => {
  const [isVisible, setIsVisible] = useState(false);

  const showWhenChildrenNotVisible = { display: isVisible ? 'none' : '' };
  const hideWhenChildrenNotVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => setIsVisible(!isVisible);

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={showWhenChildrenNotVisible}>
        <Button variant="contained" size="small" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={hideWhenChildrenNotVisible}>
        {props.children}
        <Button variant="contained" size="small" onClick={toggleVisibility}>
          {props.cancelButtonLabel}
        </Button>
      </div>
    </div>
  );
});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Toggable.name = 'Toggable';

export default Toggable;
