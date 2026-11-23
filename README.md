# 🧩 Quebra-Cabeça

Um jogo de quebra-cabeça deslizante moderno e estilizado, feito com HTML, CSS e JavaScript puro.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 📖 Sobre

Este é um jogo clássico de quebra-cabeça deslizante (também conhecido como "15 puzzle" ou "sliding puzzle") com visual moderno e recursos interativos. O objetivo é reorganizar as peças embaralhadas para formar a imagem original.

## ✨ Funcionalidades

### 🎮 Jogabilidade
- 🎚️ **3 níveis de dificuldade**: Fácil (3x3), Médio (4x4) e Difícil (5x5)
- 🖼️ **Imagem personalizada**: Carregue sua própria foto para jogar
- ⏱️ **Cronômetro**: Acompanhe o tempo de cada partida
- 🔢 **Contador de movimentos**: Veja quantos movimentos você fez
- ⌨️ **Controles por teclado**: Use as setas para mover as peças

### 🎨 Visual
- 🌈 **Tema Claro**: Gradiente em tons de azul claro e ciano
- 🌙 **Tema Escuro**: Visual elegante em tons escuros com vermelho
- 🌟 **Background animado**: Gradiente que muda suavemente de cor
- 💫 **Partículas flutuantes**: Efeito decorativo no fundo
- ✨ **Efeito de brilho**: Luz passando nas peças ao hover
- 🎆 **Confetti na vitória**: Explosão de confetes coloridos ao completar
- 📝 **Fonte Poppins**: Tipografia moderna do Google Fonts

### 🔊 Áudio
- 🎵 **Som ao mover**: "Blip" suave ao mover cada peça
- 🎶 **Som de início**: Tom ao iniciar novo jogo
- 🏆 **Melodia de vitória**: Sequência musical ao completar
- 🔇 **Controle de som**: Botão para ligar/desligar áudio

> **Nota**: Os sons são gerados em tempo real pela Web Audio API, sem necessidade de arquivos externos!

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
| Alternar tema | Botão 🌙 / ☀️ |
| Ligar/desligar som | Botão 🔊 / 🔇 |

## 📁 Estrutura do Projeto

```
quebra-cabeca/
├── index.html    # Estrutura da página
├── style.css     # Estilos, temas e animações
├── script.js     # Lógica do jogo e sistema de áudio
└── README.md     # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: Estilização com variáveis CSS, flexbox, grid, animações e temas
- **JavaScript (ES6+)**: Lógica do jogo, manipulação do DOM e eventos
- **Canvas API**: Geração da imagem padrão, confetti e processamento de imagens
- **Web Audio API**: Síntese de sons em tempo real
- **Google Fonts**: Tipografia Poppins
- **LocalStorage**: Persistência da preferência de tema

## 🎵 Sistema de Áudio

O jogo utiliza a Web Audio API para gerar sons sintetizados:

| Som | Frequência | Tipo de Onda | Descrição |
|-----|------------|--------------|-----------|
| Move | 400 Hz | Sine | "Blip" curto ao mover peça |
| Start | 600 Hz | Triangle | Tom ao iniciar jogo |
| Victory | 523 → 659 → 784 → 1047 Hz | Sine | Melodia Dó-Mi-Sol-Dó |

## 🎨 Temas

### ☀️ Tema Claro (Padrão)
- Fundo: Gradiente azul claro → azul → ciano
- Cores de destaque: `#0984e3` e `#00cec9`

### 🌙 Tema Escuro
- Fundo: Gradiente azul escuro → navy
- Cores de destaque: `#e94560` e `#ff6b6b`

A preferência de tema é salva automaticamente no navegador!

## 🎮 Como Funciona

O jogo utiliza o algoritmo de embaralhamento por movimentos válidos, garantindo que todo quebra-cabeça gerado seja solucionável. A cada clique:

1. Verifica se a peça está adjacente ao espaço vazio
2. Se válido, troca as posições no array de peças
3. Toca o som de movimento
4. Re-renderiza o tabuleiro com animação
5. Verifica se o jogador completou o quebra-cabeça
6. Se completou, dispara confetti e melodia de vitória!

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

### 💡 Ideias para contribuição
- Adicionar mais temas de cores
- Implementar ranking de melhores tempos
- Adicionar modo multiplayer
- Criar animações de transição entre telas

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👩‍💻 Autora

Feito com 💙 por **Vitória Kelly**

---

⭐ Se gostou do projeto, deixe uma estrela!
