const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>KUY PARIN</h1>');
});

app.post('/', (req, res) => {
    input = req.body;

    PO_list=[];
    CUSLOTNO_list=[];
    for(i=0;i<input.length;i++){
        PO_list[i] =  input[i]['PO'];
        CUSLOTNO_list[i] =  input[i]['CUSLOTNO'];
    }
    

    //console.log(input)
    //comon_res = {"massage":'KUY PARIN FROM POST'}
    res.json(CUSLOTNO_list);
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );