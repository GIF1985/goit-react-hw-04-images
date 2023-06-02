import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = React.memo(() => {
  return <BeatLoader color={'#123abc'} loading={true} />;
});

export default Loader;
