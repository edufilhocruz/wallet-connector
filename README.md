
# 🚀 MetaMask Wallet Connector

Uma aplicação web moderna e responsiva para conectar carteiras MetaMask, desenvolvida com React, TypeScript, Ethers.js e Tailwind CSS.

## ✨ Funcionalidades

- 🔗 **Conexão Segura com MetaMask**: Integração completa com a carteira MetaMask
- 📍 **Exibição de Dados**: Endereço da carteira, rede atual e saldo em tempo real
- ✅ **Validação Robusta**: Validação de dados com Zod para máxima segurança
- 🎨 **Interface Moderna**: Design responsivo com Tailwind CSS e componentes shadcn/ui
- 🔄 **Estados Visuais**: Feedbacks claros para conexão, carregamento e erros
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🏗️ **Arquitetura Limpa**: Código bem estruturado com hooks customizados

## 🛠️ Tecnologias Utilizadas

- **React 18** + **TypeScript**: Framework moderno com tipagem estática
- **Vite**: Build tool ultrarrápido para desenvolvimento
- **Ethers.js v6**: Biblioteca para interação com blockchain Ethereum
- **Tailwind CSS**: Framework utilitário para estilização
- **Zod**: Validação de schemas com TypeScript
- **shadcn/ui**: Componentes UI modernos e acessíveis
- **Lucide React**: Ícones SVG otimizados

## 🚀 Como Usar

### Pré-requisitos

- Node.js 16+ instalado
- MetaMask instalado no navegador
- Conexão com a internet

### Uso da Aplicação

1. **Conectar Carteira**:
   - Clique em "Connect MetaMask"
   - Autorize a conexão no MetaMask
   - Aguarde a confirmação

2. **Visualizar Dados**:
   - Endereço da carteira (formato completo e resumido)
   - Rede atual (Ethereum, Polygon, BSC, etc.)
   - Saldo em ETH/token nativo

3. **Trocar de Conta/Rede**:
   - A aplicação detecta automaticamente mudanças
   - Reconecta automaticamente quando necessário

## 🏗️ Arquitetura do Código

src/
├── components/
│   └── WalletConnector.tsx    # Componente principal da UI
├── hooks/
│   └── useWallet.ts           # Hook customizado para lógica da carteira
├── schemas/
│   └── walletSchema.ts        # Schemas Zod para validação
├── types/
│   └── ethereum.d.ts          # Declarações TypeScript
├── pages/
│   └── Index.tsx              # Página principal
└── App.tsx                    # Componente raiz

## 📋 Funcionalidades Detalhadas

### Validação com Zod

- **Endereço**: Validação de formato Ethereum válido (0x + 40 caracteres hex)
- **Rede**: Validação de nome e Chain ID
- **Saldo**: Validação de formato numérico com decimais

### Estados da Aplicação

- `disconnected`: Estado inicial, pronto para conectar
- `connecting`: Processo de conexão em andamento
- `connected`: Conectado com sucesso
- `error`: Erro na conexão ou validação

### Segurança

- Validação rigorosa de todos os dados recebidos
- Tratamento de erros abrangente
- Verificação de instalação do MetaMask
- Escuta de mudanças de conta/rede

## 🎨 Design System

- **Cores**: Paleta azul/cinza com acentos coloridos
- **Tipografia**: Inter font com hierarquia clara
- **Espaçamento**: Sistema consistente baseado em Tailwind
- **Componentes**: shadcn/ui para consistência e acessibilidade

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

## 🌐 Redes Suportadas

- Ethereum Mainnet (Chain ID: 1)
- Sepolia Testnet (Chain ID: 11155111)
- Polygon Mainnet (Chain ID: 137)
- Mumbai Testnet (Chain ID: 80001)
- BSC Mainnet (Chain ID: 56)
- BSC Testnet (Chain ID: 97)
- Outras redes (exibidas como "Chain X")

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

Desenvolvido com ❤️ usando tecnologias modernas de Web3
