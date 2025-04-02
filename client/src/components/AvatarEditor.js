import React, { useState } from 'react';
// import Avatar from "react-avatar-edit"

function AvatarEditor() {

  const [preview, setPreview] = useState(null)

  const onClose = () => {
    setPreview(null)
  }

  const onCrop = (pv) => {
    setPreview(pv)
  }

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      alert('File is to big!')
      elem.target.value = ''
    }
  }

  return (
    <div>
      {/* <Avatar 
        width={300}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={null}
      /> */}
      {preview && <img src={preview} alt='Preview' />}
    </div>
  );
}

export default AvatarEditor;