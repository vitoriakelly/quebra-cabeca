# 🧩 Quebra-Cabeça

Um jogo de quebra-cabeça deslizante feito com HTML, CSS e JavaScript puro.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📖 Sobre

Este é um jogo clássico de quebra-cabeça deslizante (também conhecido como "15 puzzle" ou "sliding puzzle"). O objetivo é reorganizar as peças embaralhadas para formar a imagem original.

## ✨ Funcionalidades

- 🎚️ **3 níveis de dificuldade**: Fácil (3x3), Médio (4x4) e Difícil (5x5)
- 🖼️ **Imagem personalizada**: Carregue sua própria foto para jogar
- ⏱️ **Cronômetro**: Acompanhe o tempo de cada partida
- 🔢 **Contador de movimentos**: Veja quantos movimentos você fez
- ⌨️ **Controles por teclado**: Use as setas para mover as peças
- 🎨 **Interface responsiva**: Funciona em desktop e dispositivos móveis
- 🎉 **Tela de vitória**: Celebração ao completar o quebra-cabeça

## 🚀 Como Jogar

### Executando o Jogo

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` no seu navegador

```bash
# Ou use um servidor local (opcional)
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Regras

1. Escolha o nível de dificuldade desejado
2. (Opcional) Carregue uma imagem personalizada
3. Clique em **"Novo Jogo"** para embaralhar as peças
4. Clique em uma peça adjacente ao espaço vazio para movê-la
5. Continue até formar a imagem completa!

### Controles

| Ação | Controle |
|------|----------|
| Mover peça | Clique na peça adjacente ao espaço vazio |
| Mover para cima | Seta ⬆️ |
| Mover para baixo | Seta ⬇️ |
| Mover para esquerda | Seta ⬅️ |
| Mover para direita | Seta ➡️ |

## 📁 Estrutura do Projeto

```
quebra-cabeca/
├── index.html    # Estrutura da página
├── style.css     # Estilos e animações
├── script.js     # Lógica do jogo
└── README.md     # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização com gradientes, flexbox, grid e animações
- **JavaScript (ES6+)**: Lógica do jogo, manipulação do DOM e eventos
- **Canvas API**: Geração da imagem padrão e processamento de imagens

## 🎮 Como Funciona

O jogo utiliza o algoritmo de embaralhamento por movimentos válidos, garantindo que todo quebra-cabeça gerado seja solucionável. A cada clique:

1. Verifica se a peça está adjacente ao espaço vazio
2. Se válido, troca as posições no array de peças
3. Re-renderiza o tabuleiro com as novas posições
4. Verifica se o jogador completou o quebra-cabeça

## 📱 Responsividade

O jogo se adapta automaticamente a diferentes tamanhos de tela:
- **Desktop**: Tabuleiro de 400x400 pixels
- **Mobile**: Tabuleiro de 300x300 pixels

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👩‍💻 Autora

Feito com 💜 por **Vitória Kelly**

---

⭐ Se gostou do projeto, deixe uma estrela!
