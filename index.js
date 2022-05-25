const http = require('http');
const fs = require('fs')


async function readBody(req) {
    return new Promise((resolve) => {
        let data = '';
        req.on('data', chunk => {
          data += chunk;
        });
        req.on('end', () => {
            resolve(data)
        });
    })
}



const server = http.createServer(async (req, res) => {

    if(req.url === "/add" && req.method === "POST") {
        const data = await readBody(req)
        let fileData = fs.readFileSync("./todos.json")
        const todos = JSON.parse(fileData)
        
        todos.push({
            id: new Date().getTime(),
            text: data
        })

        const json = JSON.stringify(todos, null, 2)
        fs.writeFileSync("./todos.json", JSON.stringify(todos, null, 2))

        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.write(json);
        res.end();

    } else if (req.url === "/todos" && req.method === "GET") {
        const fileData = fs.readFileSync("./todos.json")

        res.writeHead(200, { 'Content-Type': 'application/json' }); 
        res.write(fileData);
        res.end();

    }



    fs.readFile('./app/index.html', (err, data) => {
        if (err) {
            throw new Error(err)
        }

        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        res.write(data);
        res.end();
    })
    
})

server.listen(3000)

setTimeout(() => {}, 2147483647)
