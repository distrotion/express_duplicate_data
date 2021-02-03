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

    dup_cout = [];
    dc = [];
    dup=[]
    for(i=0;i<PO_list.length;i++){
        dc[i] = 0;
        dup[i] =[]
        for(j=0;j<input.length;j++){
            
            if(PO_list[i]===input[j]['PO']){
                //console.log(`${i}:${j}:${input[j]['PO']}`)
                dup[i][dc[i]]=input[j]['CUSLOTNO']
                dc[i]++;
            }

        }
    }
    PO_list_dup = [...new Set(PO_list)]
    dup_all = [...new Set(dup)]

    output = []
    for(i=0;i<PO_list_dup.length;i++){
        for(j=0;j<input.length;j++){
            if(PO_list_dup[i]===input[j]['PO']){
                output[i]=input[j]
                for(k=0;k<PO_list.length;k++){
                    if(PO_list[k]===PO_list_dup[i]){
                        output[i]['CUSLOTNO']=`${dup[k]}`;
                        break;
                    }
                    
                }
                break;
            }
            
        }
    }
        
    //console.log(input)
    //comon_res = {"massage":'KUY PARIN FROM POST'}
    res.json(output);
});
    
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`) );