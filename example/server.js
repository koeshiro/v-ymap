const fsp = require('fs/promises');
const path = require('path');
const express = require('express');
const app = express();
app.use('/dist',express.static(path.join(__dirname, '../dist')));

app.use(express.static(__dirname));
/*app.get('/v-ymap',async (req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.end(await fsp.readFile(`${__dirname}/v-ymap.html`));
});*/
app.listen(3000,()=>{
    console.log('http://localhost:3000')
});