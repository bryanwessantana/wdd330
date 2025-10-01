# 🏋️‍♂️ Fitness App – Website/App de Nutrição & Exercícios  

Um aplicativo web responsivo que auxilia usuários a melhorar seus hábitos de saúde, alimentação e treino através de recomendações personalizadas.  
Construído **sem frameworks JavaScript** (apenas ES Modules), priorizando **acessibilidade, responsividade e boa arquitetura de código**.  

---

## 🚀 Funcionalidades Principais  

### 👤 User Profile Setup  
Os usuários podem configurar seu perfil inserindo: idade, gênero, peso, altura, preferências alimentares, nível de atividade e objetivos.  

### 🍎 Customized Meal Planner  
- Sugestões de refeições diárias ou semanais baseadas em preferências do usuário (ex.: vegetariano, keto).  
- Integração com APIs externas de nutrição.  

### 🏃 Exercise Schedule Generator  
- Rotina personalizada de treinos (diários/semanais).  
- Ajustado conforme os objetivos (força, cardio, flexibilidade).  

### 🔥 Calorie & Nutrient Tracker  
- Exibe calorias e macronutrientes das refeições.  
- Dados vindos de APIs externas de nutrição.  

### 📊 Progress Tracker  
- Registro de peso, treinos realizados e refeições seguidas.  
- Gráficos dinâmicos (sem bibliotecas externas, apenas JavaScript puro).  

### 📱 Responsive Dashboard  
- Painel único que atualiza dinamicamente refeições e exercícios.  
- Layout adaptado para **desktop** e **mobile**.  

### 💡 Motivational Tips & Quotes  
- Integração com API de frases motivacionais para manter o engajamento.  

### ♿ Accessibility Features  
- HTML semântico.  
- ARIA roles e suporte a leitores de tela.  
- Navegação por teclado.  
- Tipografia responsiva e imagens com `alt`.  

---

## ⚡ Desafios Técnicos  

### 🔗 API Limitations & Rate Limits  
- Necessário gerenciar limites de requisições.  
- Cache local para reduzir chamadas desnecessárias.  

### 🔄 Data Integration & Consistency  
- Combinar dados de múltiplas APIs (refeições + exercícios) de forma clara e coesa.  

### 📱 Responsive Design Complexity  
- Garantir usabilidade perfeita em **mobile e desktop**, mantendo acessibilidade.  

### 🧩 User Personalization Logic  
- Algoritmos para adaptar recomendações conforme objetivos (perda de peso, ganho de massa, restrições alimentares).  

### 📊 Progress Tracking & Visualization  
- Implementação de gráficos **interativos e acessíveis** apenas com **JavaScript vanilla**.  

### ♿ Accessibility & SEO Compliance  
- Seguir boas práticas de acessibilidade e SEO sem comprometer o design.  

### 📂 Code Organization & Maintainability  
- Manter arquitetura modular clara, evitando “spaghetti code” em JS puro.  

---

## 🛠️ Tecnologias Utilizadas  

- **HTML5 semântico**  
- **CSS3 (Flexbox + Grid + Media Queries)**  
- **JavaScript (ES Modules, sem frameworks)**  
- **APIs Externas**:  
  - Nutrição/Refeições (ex.: [Spoonacular](https://spoonacular.com/food-api))  
  - Frases Motivacionais (ex.: [ZenQuotes](https://zenquotes.io/))  

---

## 📂 Estrutura de Pastas  

```bash
fitness-app/
│
├── 📄 README.md              # Documentação principal do projeto
├── 📄 LICENSE                # Licença (ex.: MIT)
├── 📄 index.html             # Página inicial do app
├── 📄 manifest.json          # (opcional) Configuração PWA
│
├── 📂 src/                   # Código-fonte
│   ├── 📂 css/
│   │   ├── style.css         # Estilos principais
│   │   └── responsive.css    # Media queries e ajustes responsivos
│   │
│   ├── 📂 js/
│   │   ├── main.js           # Inicialização do app
│   │   ├── api/
│   │   │   ├── meals.js      # Funções para buscar dados da API de refeições
│   │   │   ├── quotes.js     # Funções para frases motivacionais
│   │   │   └── exercises.js  # Funções para exercícios
│   │   ├── components/
│   │   │   ├── dashboard.js  # Renderização do painel principal
│   │   │   ├── profile.js    # Configuração do perfil do usuário
│   │   │   ├── tracker.js    # Funções de progresso + gráficos
│   │   │   └── utils.js      # Funções auxiliares
│   │   └── accessibility.js  # Acessibilidade e ARIA roles
│   │
│   └── 📂 assets/
│       ├── img/              # Imagens (ícones, backgrounds)
│       ├── icons/            # SVGs
│       └── fonts/            # Tipografias customizadas (se necessário)
│
├── 📂 docs/                  # Documentação extra
│   └── api-reference.md      # Referência das APIs utilizadas
│
└── 📂 tests/                 # Testes unitários (se for implementar)
    └── test-sample.js
