import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

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
        <button type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={hideWhenChildrenNotVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>
          {props.cancelButtonLabel}
        </button>
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
