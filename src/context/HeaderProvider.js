import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import HeaderContext from './HeaderContext';

export default function HeaderProvider({ children }) {
  const [showBar, setShowBar] = useState(false);
  const [checkedRadioButton, setCheckedRadioButton] = useState('ingredient');
  const [searchInput, setSearchInput] = useState('');

  const showBarFunc = useCallback(() => {
    const bool = showBar;
    setShowBar(!bool);
  }, [showBar]);
  const checkedRadioButtonFunc = ({ target }) => setCheckedRadioButton(target.value);

  const inputChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
  };
  const values = useMemo(() => ({
    checkedRadioButton,
    checkedRadioButtonFunc,
    showBar,
    showBarFunc,
    inputChange,
    searchInput,
  }), [
    searchInput,
    showBar,
    checkedRadioButton,
    showBarFunc,
  ]);

  return (
    <HeaderContext.Provider value={ values }>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
