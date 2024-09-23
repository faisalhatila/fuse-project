import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const UploadedFilePreview2 = ({
  selectedFile,
  selectedFiles,
  setSelectedFiles,
  url,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const formatFileSize = (size) => {
    return size > 1024 * 1024
      ? `${(size / (1024 * 1024)).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  const handleRemoveFile = () => {
    const tempFiles = [...selectedFiles].filter((item) => item.id !== id);
    setSelectedFiles(tempFiles);
  };

  return (
    <div className="relative w-[100px] h-[100px] rounded border-1 border-[#ccc] cursor-pointer flex flex-col">
      <div className="p-5 flex-1 flex justify-center items-center">
        {selectedFile.type === 'application/pdf' ? (
          <img
            src="/assets/icons/png-pdf-file-icon-8.png"
            alt="Preview"
            className="w-[50%]"
          />
        ) : selectedFile.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
          <img src="/assets/icons/docs.png" alt="Preview" className="w-[50%]" />
        ) : selectedFile.type === 'text/plain' ? (
          <img src="/assets/icons/text.png" alt="Preview" className="w-[50%]" />
        ) : (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-[50%]"
          />
        )}
      </div>
      <IconButton
        className="absolute p-0 top-[-15px] right-[-15px] z-10"
        onClick={handleRemoveFile}
      >
        <FuseSvgIcon className=" bg-[#f4f4f4]" color="action">
          heroicons-outline:x-circle
        </FuseSvgIcon>
      </IconButton>
      <div className="border-t-1 border-t-[#ccc] px-5 pt-2">
        <p className="text-xs truncate w-full text-center">
          {selectedFile.name}
        </p>
        <p className="text-xs text-center">
          {formatFileSize(selectedFile.size)}
        </p>
      </div>
    </div>
  );
};

export default UploadedFilePreview2;
