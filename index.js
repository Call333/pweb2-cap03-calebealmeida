// Atividade Cap. 3 — Servidor HTTP com a biblioteca padrão (node:http).
//
// Implemente aqui um servidor que atenda às 10 rotas descritas no README.md.
//
// Regras essenciais:
//   - Use o módulo nativo `node:http` (NÃO use Express — o objetivo é sentir "na mão").
//   - O servidor deve ouvir em `process.env.PORT || 3000`.
//   - Resolva UMA rota por commit, seguindo o padrão de mensagens em COMMITS.md.
//   - A cada push, o autograder roda sozinho e mostra o resultado na aba "Actions".
//
// Ponto de partida (descomente e desenvolva):
//
// import http from 'node:http';
//
// const PORT = process.env.PORT || 3000;
//
// const server = http.createServer((req, res) => {
//   // dica: use req.method, req.url e req.headers para decidir a resposta
// });
//
// server.listen(PORT, () => console.log(`Servidor em http://localhost:${PORT}`));

import { execFile } from 'node:child_process';
import { log } from 'node:console';
import http from 'node:http';

const host = "127.0.0.1";
const port = 3000;

const server = http.createServer(

    (req, res) => {
        if (req.method === "GET" && req.url === "/") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("Olá, Mundo!");
            return;
        }

        if (req.method === "GET" && req.url === "/sobre") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write('<h1>Sobre</h1>');
            res.end();
            return;
        }

        if (req.method === "GET" && req.url.startsWith("/saudacao/")) {
            const partes = req.url.split('/');
            const nome = partes[2]
            res.writeHead(200, { "Content-type": "text/html" });
            res.end(`Olá, ${nome}!`);
            return;
        }

        if (req.method === "POST" && req.url === "/echo") {
            let corpo = "";

            req.on('data', dados => {
                corpo += dados.toString();
            })

            req.on('end', () => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(corpo);
            })

            return;
        }
        
        if (req.method === "PUT" && req.url.startsWith("/itens/")) {
            const partes = req.url.split("/");
            const numeroItem = partes[2];

            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Item ${numeroItem} atualizado`);
            return;
        }

        if (req.method === "DELETE" && req.url.startsWith("/itens/")) {
            res.writeHead(204, { "Content-Type": "text/plain" });
            res.end();
            return;
        }

        if (req.method === "PATCH" && req.url === "/config") {
            res.writeHead(200, { "Content-Type": "text"});
            res.end("Configuração atualizada");
            return;
        }

        if (req.method === "HEAD" && req.url === "/status" ) {
            res.writeHead(200, { "x-status": "ok" } )
            res.end();
            return;
        }

        if (req.method === "GET" && req.url === "/agente") {
            const userAgent = req.headers["user-agent"];

            res.writeHead(200, { "Content-Type": "text/plain" });
            
            if (userAgent.includes("curl")) {
                res.end("Você é o cURL");
            } else if(userAgent.includes("Chrome")) {
                res.end("Você é um navegador");
            } else {
                res.end("Agente desconhecido");
            }

            return;
        }

        if (req.method === "GET" && req.url === "/secreto") {
            const senha = req.headers["x-senha"];           

            if (senha == "1234") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Acesso liberado");
            } else {
                res.writeHead(401, { "Content-Type": "text/plain" });
                res.end();
            }

            return;
        }        
        res.writeHead(404);
        res.end();
    }
)

server.listen(
    port, host, () => {
        console.log(`Servidor rodando em http://${host}:${port}/`)
    }
)