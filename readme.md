# NODE-API-DEMO

[PT-BR]

Esta é uma API simples em Node.js, criada para testar conceitos de Cloud usando instâncias EC2 da AWS. Ela expõe alguns endpoints básicos para validar integração e comunicação via HTTP.

### Endpoints

- **GET /** : Retorna "Hello World!".
- **GET /health** : Retorna status de funcionamento.
- **POST /webhook** : Recebe e retorna dados JSON.
-

[EN]

This is a simple Node.js API created to test Cloud concepts using AWS EC2 instances. It exposes basic endpoints to validate HTTP integration and communication.

### Endpoints

- **GET /** : Returns "Hello World!".
- **GET /health** : Returns server status.
- **POST /webhook** : Receives and returns JSON data.
- **POST /webhook (Error)** : Returns a 400 error for invalid JSON.
