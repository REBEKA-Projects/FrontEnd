# 🏛️ FIDUCCI | Institutional RWA Interface

**FIDUCCI** is a professional-grade frontend interface for Real World Asset (RWA) tokenization, built on **Arbitrum**. It provides a high-fidelity, high-performance environment for managing institutional property vaults with integrated on-chain verification.

---

## 🛠️ Technology Stack

This project is built using a modern, type-safe, and high-performance frontend stack:

*   **Core Framework**: [Next.js 15+](https://nextjs.org/) (App Router & Server Components)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for exhaustive type safety.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom **Blueprint Design System** for institutional aesthetics.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, high-performance global state (Auth, KYC, UI states).
*   **Web3 Integration**: [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) for seamless Arbitrum/Ethereum contract interaction.
*   **Icons**: [Lucide React](https://lucide.dev/) for consistent, scalable vector icons.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) & Vanilla CSS for professional micro-interactions.

---

## 🚀 Getting Started

Follow these steps to get the development environment running locally.

### 1. Prerequisites
- **Node.js**: v18.x or higher (LTS recommended).
- **Package Manager**: npm (v9+) or yarn.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone <repository-url>
cd FrontEnd
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the necessary keys:
```env
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Running Locally
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ✨ Key Features (Frontend)

*   **Institutional UI/UX**: Clean, professional design that conveys trust, with clear visualizations of financial and legal data.
*   **Secure Wallet Connection**: Robust integration with major Web3 wallets (MetaMask, WalletConnect, Coinbase Wallet) supporting Arbitrum One and Sepolia networks.
*   **Asset Visualization Dashboard**: Detailed presentation of RWA assets (e.g., location maps, legal document access, and institutional metrics of the tokenized assets).
*   **Investment Flow**: Intuitive interface for purchasing (minting) fractionalized tokens and viewing the user's portfolio balance in real-time.
*   **On-Chain Data Fetching**: Real-time reading of data directly from the Arbitrum smart contracts (token price, available supply, and Oracle verification logs).

---

## 🏗️ Architecture Note
The project leverages Next.js **Server Components** for initial data fetching and **Client Components** for interactivity (Modals, Tabs, Real-time feeds). This hybrid approach ensures optimal performance and SEO while maintaining a rich, app-like experience.

© 2026 **FIDUCCI Protocol**. Built on Arbitrum.
