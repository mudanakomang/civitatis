const { fs, path, resultJsonPath } = require('./libs');

async function getMessage() {
    try {
        const file = resultJsonPath
        const data = await fs.readFile(file, 'utf-8')
        const parsedData = JSON.parse(data)
        const target = parsedData.filter(tour => tour.confirmed === false)
        await getTemplate(target)
    } catch (error) {
        console.error('Gagal membaca file:', error);        
    }
}

async function getTemplate(target) {
    try {
        for(const t of target){
            const lang = t.language
            const filePath = path.join(__dirname, 'templates', `${lang}.txt`);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const newContent = await fillTemplate(fileContent, t);
            console.log(newContent)
        }
    } catch (error) {
        console.error(`Gagal membaca template untuk bahasa ${lang}:`, error.message);
    }
}

async function fillTemplate(template, data){
    return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || '');
}
getMessage()