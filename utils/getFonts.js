const { readdir } = require('fs').promises;

const getFontsList = async () => {
    const files = await readdir('./public/fonts');
    return files;
};

module.exports={
    getFontsList
}