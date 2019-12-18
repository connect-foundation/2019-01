import React, { useState, useEffect } from 'react';
import {
  ImageBodyWrapper, ImageTable, ImageTh, ImageThead, ImageTr, ImageTbody, ImageButton,
} from './style';
import fetchData from '../util';
import ImageRow from './Row';
import ImageModal from './ImageModal';
import URL from '../../../constants/url';

const ImageCategory = () => {
  const [ImageData, setImageData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [fetchImage, setFetchImage] = useState(null);

  const openEditModal = (image) => () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchEditData = (imageInfo) => {
          fetchData('put', URL.ADMIN.IMAGE, { id: imageInfo.id, data: imageInfo });
        };
        setFetchImage(() => fetchEditData);
        setModalContent(image);
      }
      return true;
    });
  };

  const openAddModal = () => {
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen === false) {
        const fetchAddData = (imageInfo) => {
          fetchData('post', URL.ADMIN.IMAGE, imageInfo);
        };
        setFetchImage(() => fetchAddData);
        setModalContent({
          category: 'category',
          name: 'name',
          url: 'url',
        });
      }
      return true;
    });
  };

  const closeModal = () => setIsModalOpen(false);

  const makeNewRow = (imageList) => {
    setImageData(() => imageList.map(
      (image) => {
        const openModal = openEditModal(image);
        return <ImageRow openModal={openModal} image={image} />;
      },
    ));
  };

  useEffect(() => {
    fetchData('get', URL.ADMIN.IMAGE_LIST)
      .then((res) => makeNewRow(res.imageList));
  }, []);

  return (
    <ImageBodyWrapper>
      <ImageTable>
        <ImageThead>
          <ImageTr>
            <ImageTh>id</ImageTh>
            <ImageTh>category</ImageTh>
            <ImageTh>name</ImageTh>
            <ImageTh>url</ImageTh>
            <ImageTh>
              <ImageButton onClick={openAddModal}>추가</ImageButton>
            </ImageTh>
          </ImageTr>
        </ImageThead>
        <ImageTbody>
          {ImageData}
        </ImageTbody>
      </ImageTable>
      {isModalOpen ? <ImageModal image={modalContent} closeModal={closeModal} fetchData={fetchImage} /> : ''}
    </ImageBodyWrapper>
  );
};

export default ImageCategory;
