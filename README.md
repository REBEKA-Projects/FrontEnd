# REBEKA: Real Estate Blockchain Ekosystem Arbitrum | Investor dApp

![REBEKA dApp Banner](https://via.placeholder.com/1200x400?text=REBEKA+Protocol+-+Investor+Interface) > **The user-facing interface for the REBEKA Protocol. Bridging institutional real estate with on-chain liquidity on Arbitrum Stylus.**

This repository houses the source code for the **REBEKA Frontend (dApp)**. It is the graphical interface designed for both retail and institutional investors to interact securely and seamlessly with the protocol's smart contracts.

The goal of this dApp is to abstract the complexity of blockchain technology (RWA compliance, Legal Trusts, Stylus architecture) into a fluid, reliable, and premium user experience (UX), enabling fractional investment in assets like the **Genesis Pilot: Cerro del Chiquihuite**.

---

## 🛠️ Tech Stack

This dApp is built with a modern, performance-driven stack focused on security and user experience:

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router) - For hybrid rendering and optimized routing.
* **Language:** [TypeScript](https://www.typescriptlang.org/) - For robust, type-safe code.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - For fast, responsive, and consistent UI design.
* **Blockchain Interaction:** [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) - React Hooks and utilities for interacting with Ethereum/Arbitrum.
* **Wallet Connection:** [RainbowKit](https://www.rainbowkit.com/) - For a seamless and polished wallet connection experience.
* **State Management:** Zustand (or Context API) - For handling global application state.

---

## ✨ Key Features (Frontend)

* **Institutional UI/UX:** Clean, professional design that conveys trust, with clear visualizations of financial and legal data.
* **Secure Wallet Connection:** Robust integration with major Web3 wallets (MetaMask, WalletConnect, Coinbase Wallet) supporting Arbitrum One and Sepolia networks.
* **Asset Visualization Dashboard:** Detailed presentation of RWA assets (e.g., location maps, legal document access, financial metrics of the $RBK-CHIQ token).
* **Investment Flow:** Intuitive interface for purchasing (minting) fractionalized tokens and viewing the user's portfolio balance.
* **On-Chain Data Fetching:** Real-time reading of data directly from the Stylus smart contracts (token price, available supply, Survival Vault status).

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the dApp locally on your machine:

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (LTS version recommended, e.g., v18.x or v20.x)
* npm, yarn, or pnpm

### 2. Clone the Repository
```bash
git clone [https://github.com/your-organization/rebeka-frontend.git](https://github.com/your-organization/rebeka-frontend.git)
cd rebeka-frontend
