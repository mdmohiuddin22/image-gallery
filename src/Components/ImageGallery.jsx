

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import '../App.css'; 
import { CheckSquareOutlined } from '@ant-design/icons';

function ImageGallery() {
  const [images, setImages] = useState([
    {"id": 1, "url": "https://i.ibb.co/K92Qhms/image-1.webp"},
    {"id": 2, "url": "https://i.ibb.co/MhGddrq/image-2.webp"},
    {"id": 3, "url": "https://i.ibb.co/5RqnJJ5/image-3.webp"},
    {"id": 4, "url": "https://i.ibb.co/KcnGC0T/image-4.webp"},
    {"id": 5, "url": "https://i.ibb.co/r41rN3n/image-5.webp"},
    {"id": 6, "url": "https://i.ibb.co/BPmbS05/image-6.webp"},
    {"id": 7, "url": "https://i.ibb.co/fYLn3nw/image-7.webp"},
    {"id": 8, "url": "https://i.ibb.co/J3B78VF/image-8.webp"},
    {"id": 9, "url": "https://i.ibb.co/b7b0YJV/image-9.webp"}
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);

  const handleImageSelection = (imageId) => {
    // Toggle image selection or handle feature image setting
    const selectedImageIndex = selectedImages.indexOf(imageId);
    if (selectedImageIndex === -1) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      const updatedSelection = [...selectedImages];
      updatedSelection.splice(selectedImageIndex, 1);
      setSelectedImages(updatedSelection);
    }
  };

  const handleDeleteImages = () => {
    // Delete selected images
    const remainingImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(remainingImages);
    setSelectedImages([]);
  };

  const handleSetFeatureImage = () => {
    // Set the first selected image (from LTR) as the featured image
    if (selectedImages.length > 0) {
      setFeaturedImage(selectedImages[0]);
    }
  };

  const onDragEnd = (result) => {
    // Handle image reordering based on drag-and-drop result
    if (!result.destination) return; list
    const reorderedImages = [...images];
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);
    setImages(reorderedImages);
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={handleDeleteImages}>Delete Selected</button>
        <button onClick={handleSetFeatureImage}>Set Featured Image</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="imageGallery">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="gallery-grid"
            >
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`gallery-item ${
                        selectedImages.includes(image.id) ? 'selected' : ''
                      } ${featuredImage === image.id ? 'featured' : ''}`}
                      onClick={() => handleImageSelection(image.id)}
                    ><div className='mark'>< CheckSquareOutlined className='check' /></div>
                      <img className='images' src={image.url} alt={`Image ${image.id}`}  />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ImageGallery;




