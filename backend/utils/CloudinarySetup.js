const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '' // Click 'View API Keys' above to copy your API secret
});

// const upload_file = async (file, folder) => {

//     return new Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload(
//             file,
//             (error,result) => {
//                 resolve({
//                     public_id: result.public_id,
//                     url: result.url
//                 })
//             },
//             {
//                 resource_type: "auto",
//                 folder
//             }
//         )
//     })

// }

const upload_file = async (file, folder) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
            file,
            { resource_type: "auto", folder },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve({
                    public_id: result.public_id,
                    url: result.url
                });
            }
        );
    });
};

const delete_file = async (file) => {
    const res = await cloudinary.uploader.destroy(file);

    if (res?.result === "ok") {
        return true
    }
}


module.exports = { upload_file, delete_file }