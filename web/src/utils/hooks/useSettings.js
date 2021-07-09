import StoreContext from 'contexts/StoreContext';
import { useContext } from 'react';

const useSettings = () => useContext(StoreContext);

export default useSettings;
