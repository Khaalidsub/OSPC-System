import { UploadCard } from "components"
import React, { useState } from "react"

export const useImageUpload = (image=null)=>{

    const [file, setFile] = useState(null)

    const ImageCard = ()=>{
        return (
            <div className="flex flex-col">
            <label className="text-sm font-poppins pb-2">Image</label>
            <UploadCard setFile={setFile} image={image} file={file}/>
            </div>
        )
    }

    return {
        file,
        setFile,
        ImageCard
    }
}