import { useState, useEffect, Fragment } from 'react';

import GalleryImage from '../../components/Gallery/GalleryImage';
import Container from '../../components/Layouts/Container';

const GalleryPage = () => {
  return (
    <Container>
      <GalleryImage />
    </Container>
  );
};

export default GalleryPage;
