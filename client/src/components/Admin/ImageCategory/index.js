import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import CustomSnackbar from '../CustomSnackbar';
import { fetchData } from '../../../util';
import ImageRow from './Row';
import ImageModal from './ImageModal';
import URL from '../../../constants/url';
import ADMIN from '../../../constants/admin';

const ImageCategory = () => {
  const [ImageData, setImageData] = useState([]);
  const [fetchImage, setFetchImage] = useState(null);
  const [modalContent, setModalContent] = useState({});
  const [fetchResult, setFetchResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const timerId = useRef(null);

  const openSnackbar = (result) => {
    setIsSnackbarOpen(true);
    setFetchResult(result);
    timerId.current = setTimeout(() => setIsSnackbarOpen(false), ADMIN.SNACKBAR_TIME_MS);
  };

  /**
   * @param {string} fetchType
   */
  const fetchImageData = (fetchType) => (imageInfo) => {
    const imageRequestMap = new Map([
      ['edit', { fetchMethod: 'put', data: { id: imageInfo.id, data: imageInfo } }],
      ['add', { fetchMethod: 'post', data: imageInfo }],
    ]);

    fetchData(
      imageRequestMap.get(fetchType).fetchMethod,
      URL.ADMIN.IMAGE,
      imageRequestMap.get(fetchType).data,
    )
      .then(({ result }) => openSnackbar(result));
  };

  /**
   * @param {object} image
   *   @param {number} image.id
   *   @param {string} image.category
   *   @param {string} image.name
   *   @param {string} image.url
   */
  const openEditModal = (image) => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        setFetchImage(() => fetchImageData('edit'));
        setModalContent(image);
      }
      return true;
    });
  };

  const openAddModal = () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        setFetchImage(() => fetchImageData('add'));
        setModalContent({
          id: ADMIN.MODAL.DEFAULT.ID,
          category: ADMIN.MODAL.DEFAULT.CATEGORY,
          name: ADMIN.MODAL.DEFAULT.NAME,
          url: ADMIN.MODAL.DEFAULT.URL,
        });
      }
      return true;
    });
  };

  const closeModal = () => setIsModalOpen(false);

  /**
   * @param {Array.<{id: number}>} imageList
   */
  const makeNewRow = (imageList) => {
    setImageData(() => imageList.map(
      (image) => (
        <ImageRow
          key={image.id}
          openModal={openEditModal}
          image={image}
          openSnackbar={openSnackbar} />
      ),
    ));
  };

  useEffect(() => {
    fetchData('get', URL.ADMIN.IMAGE_LIST)
      .then((res) => makeNewRow(res.imageList));

    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={openAddModal}>
              추가
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{ImageData}</TableBody>
      </Table>
      <CustomSnackbar open={isSnackbarOpen} result={fetchResult} />
      {isModalOpen ? (
        <ImageModal
          image={modalContent}
          open={isModalOpen}
          closeModal={closeModal}
          fetchData={fetchImage} />
      ) : ''}
    </>
  );
};

export default ImageCategory;
