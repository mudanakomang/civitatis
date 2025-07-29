const { fs, path, gapiUrlSendMessage, gapiUrlSendImage, chatId, axios, formData } = require('./libs');

async function sendMessage(message, filePath = null) {
    if (filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                throw new Error('File tidak ditemukan.');
            }
            const form = new formData();
            // const fileName = path.basename(filePath);
            console.log(filePath)
            form.append('file', fs.createReadStream(filePath));
            form.append('caption', message);
            form.append('chatId', chatId);
            const response = await axios.post(gapiUrlSendImage, form, {
                headers: form.getHeaders()
            });
            console.log(response.data);
        } catch (err) {
            console.error('❌ Gagal mengirim:', err.response?.data || err.message);
        }
    } else {
        try {
            const response = await axios.post(gapiUrlSendMessage, {
                chatId,
                message
            });
            console.log(response.data);
        } catch (err) {
            console.error('❌ Gagal mengirim:', err.response?.data || err.message);
        }
    }
}

module.exports = {
    sendMessage
}