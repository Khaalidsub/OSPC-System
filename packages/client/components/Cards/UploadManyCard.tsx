import axios from "axios";
import { SecondaryButton } from "components/Buttons";
import { useMemo, useState } from "react";
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
export const UploadManyCard = ({ setFiles,files }) => {
  
    // const [isUploaded, setIsUploaded] = useState(false)
    const { acceptedFiles, isDragActive,
        isDragAccept,
        isDragReject, getRootProps, getInputProps } = useDropzone({
            accept: ['image/*','application/pdf'],
            maxFiles:3,
            onDrop: acceptedFiles => {
                console.log(acceptedFiles);
                
                setFiles(acceptedFiles.map(file=> {
                    if (file.type !=='application/pdf') {
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                            fileName:file.name
                        })
                      return file
                    }else{
                    Object.assign(file, {
                        preview: '/icons/pdf.svg',
                        fileName:file.name
                    })
                    return file
                }
                }));
                // setIsUploaded(false)
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
    const Images =()=><> {files.map(file =>(
        <div key={file.fileName} className="text-center">
           <img className="h-24 w-24" src={`${file.preview}`}  alt="" /> 
           <label className=""  >{file.fileName} </label>
        </div>
    ))}</>



    return (
        <div className="flex flex-col space-y-4">
            
                <div className='' {...getRootProps({ className: 'cursor-pointer dropzone border border-dotted p-2 rounded bg-gray-100 ', style: style as any })}>
                    <input {...getInputProps()} />
                    <div className='text-lg  h-full '>
                        <p className='self-start'>Drag 'n' drop an image here, or click to select image</p>
                    </div>
                </div>
        

    
            <div className='flex flex-row space-x-7'>
            <Images/>
            </div>

        </div>

    )
}


