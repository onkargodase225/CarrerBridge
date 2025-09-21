// yahase ek data uri genereate hoke milega

import DataUriParser from "datauri/parser.js"
import path from "path"

//mai udhar usercontroller me kuch argument bhej raha hu , aur idahar parameter vo recevie karke
// karke function me usme changes karke return kar raha hu bas itna hi hai

const getDataUri=(file)=>{

    if (!file || !file.originalname || !file.buffer) {
        throw new Error("Invalid file passed to getDataUri");
    }

    const parser=new DataUriParser();
    const extName=path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
}

export default getDataUri;