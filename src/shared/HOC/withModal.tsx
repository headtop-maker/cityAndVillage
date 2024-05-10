import React, {FC} from 'react';
import ModalScreen from '../../features/Modal/ui/Modal';

const withModal = (WrappedComponent: React.ComponentType) => {
  const HOC: FC = props => {
    return (
      <>
        <WrappedComponent {...props} />
        <ModalScreen />
      </>
    );
  };

  return HOC;
};

export default withModal;
