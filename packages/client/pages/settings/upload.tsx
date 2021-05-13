import React, { useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  
function UploadProfileImage() {
    const [file, setFile] = useState(null)
  const { acceptedFiles,isDragActive,
    isDragAccept,
    isDragReject, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
        // console.log(acceptedFiles[0]);
        const file = acceptedFiles[0]
        
      setFile( Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
    }

  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  return (
    <div className=" w-1/2  mx-auto my-2 bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-6">
          <h3 className='text-2xl'>Upload Profile Image</h3>
          <div className="border border-dashed rounded-full flex flex-col items-center">
            { file && <img className="h-44 w-44 rounded-full"   src={`${file.preview}`} alt="" />}
            {!file && <div className='h-44 w-44 rounded-full flex flex-row justify-center bg-gray-100'> <p className='text-center self-center'>Image Preview</p></div>}
          </div>
         
          <div className='' {...getRootProps({ className: 'cursor-pointer dropzone border border-dotted p-2 rounded bg-gray-100 h-44',style:style as any })}>
          <input {...getInputProps()} />
          <div className='text-lg  h-full '>
              <p className='self-start'>Drag 'n' drop an image here, or click to select image</p>
              </div>
        </div>
   
     
      </div>
    </div>
  );
}

export default UploadProfileImage;
