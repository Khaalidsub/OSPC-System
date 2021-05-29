import { UploadManyCard } from "components"
import React, { useState } from "react"

export const useMultipleFileUpload = ({label,description})=>{

    const [files, setFiles] = useState([])

    const UploadCard = ()=>{
        return (
            <div className="flex flex-col space-y-3">
            <label className="text-sm font-poppins font-semibold">{label}</label>
            <label className="text-xs font-poppins pb-2">{description}</label>
            <UploadManyCard setFiles={setFiles}  files={files}/>
            </div>
        )
    }

    return {
        files,
        setFiles,
        UploadCard
    }
}