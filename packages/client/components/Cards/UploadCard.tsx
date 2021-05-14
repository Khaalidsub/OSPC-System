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
export const UploadCard = ({ setFile,file, image=null }) => {
  
    // const [isUploaded, setIsUploaded] = useState(false)
    const { acceptedFiles, isDragActive,
        isDragAccept,
        isDragReject, getRootProps, getInputProps } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
                // console.log(acceptedFiles[0]);
                const file = acceptedFiles[0]

                setFile(Object.assign(file, {
                    preview: URL.createObjectURL(file)
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



    return (
        <div className="flex flex-col space-y-4">
            <div className='flex flex-row space-x-2'>
                {!file && (!image && <div className='h-24 w-24 rounded-full flex flex-row justify-center bg-gray-100'> <p className='text-center self-center text-xs'>Image Preview</p></div>)}
                {!file && (image && <img className="h-24 w-24 rounded-full" src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image}`}  alt="" />)}
                {file && <img className="h-24 w-24 rounded-full" src={`${file.preview}`} alt="" />}
                <div className='' {...getRootProps({ className: 'cursor-pointer dropzone border border-dotted p-2 rounded bg-gray-100 ', style: style as any })}>
                    <input {...getInputProps()} />
                    <div className='text-lg  h-full '>
                        <p className='self-start'>Drag 'n' drop an image here, or click to select image</p>
                    </div>
                </div>

            </div>
            {/* <div className='px-2 w-1/3'>
                {file &&( !isUploaded && <SecondaryButton onClick={(e)=>{
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    onSubmit()

                }} label="upload image" />)}
            </div> */}

        </div>

    )
}


