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

        res.writeHead(404);
        res.end();
    }
)

server.listen(
    port, host, () => {
        console.log(`Servidor rodando em http://${host}:${port}/`)
    }
)