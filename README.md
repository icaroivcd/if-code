# 📌 IF Codes

Backend do sistema de submissão e correção de código

---

## 🚀 Tecnologias Utilizadas

- [Laravel](https://laravel.com/) – Framework PHP para desenvolvimento web
- [Docker](https://www.docker.com/) – Containerização do ambiente
- [PostgreSQL](https://www.postgresql.org/) – Banco de dados relacional

---

## 📦 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PHP 8.1](https://www.php.net)
- [Composer](https://getcomposer.org)

---

## 🛠️ Instalação

Siga os passos abaixo para configurar e executar o projeto na sua máquina local.

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Docker Compose** instalados.

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/ProjetoIntegradorIFMOC/back.git
    cd back/src
    ```

2.  **Copie o arquivo de variáveis de ambiente:**

    ```bash
    cp .env.example .env
    ```
3.  **Instale as dependências do laravel:**

    ```bash
    composer install
    ```

4.  **Inicie os contêineres do Docker:**

    ```bash
    docker compose up -d
    ```
  
7.  **Acesse a aplicação:**

    A aplicação estará disponível em `http://localhost:8000`.
