# REZY
![Banner](/Colorful Gradient Modern Zoom Virtual Background.png)


## Konichiwa!
### "A Blockchain Rewards Based Platform for the Web3hackathon KEY3 HACKATHON" in Japan

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---


## About
Rezy is a recycling platform that operates on the Astar Network. It offers a reward mechanism for people who recycle PET plastic bottles, providing the 'PET' token, an ERC20 standard, which can be redeemed for real-world goods and services in the Tokyo Torch complex.

## Features

### Frontend Features: 
- **User Interface:** Developed with Next.js and TypeScript, incorporating React components for a dynamic and responsive experience.
- **Styling:** A combination of Sass and Tailwind CSS ensures an aesthetically appealing design.
- **Blockchain Integration:** Utilizes ThirdWeb, Biconomy SDK, and Particle Wallet SDK for secure and efficient blockchain transactions.

![FrontEnd](/rezy-screen.png)

### Backend Features:
1. **User Interaction with an Inverse Vending Machine:** Users scan and deposit bottles to earn PET tokens.
2. **Backend Processing:** The backend counts the bottles and uses a Thirdweb function to mint corresponding PET tokens.
3. **Gasless Experience:** Backend handles gas requirements, offering a seamless user experience without needing gas in the user's Particle wallet.

### User Interaction:
User interaction with an inverse vending machine: Users scan and deposit bottles to earn PET tokens. The backend counts the bottles and uses a Thirdweb function to mint corresponding PET tokens. Backend handles gas requirements, offering a seamless user experience without needing gas in the user's Particle wallet.

## Installation

### Frontend Installation:
1. Clone the Rezy-Front-End repository.
2. Install dependencies using yarn.
3. Start the development server with yarn dev.
4. An .env file is required for testing (provided upon request).
5. Requires node.js 18

### Backend Installation:

Install dependencies with npm or yarn which includes teo microservices: Minter / Storageandproducts / pet-erc20 and petTokenBalances.
Run node server.js in the Minter folder to start the backend server.
Execute yarn /npm storage.js in the minter folder for storage management.
1. Clone the `Rezy-Backend` repository.
2. Install dependencies with `npm`.

Contributing
For queries regarding contributions, such as issues or pull requests, please contact cedarmat@gmail.com or cryptopoeta@gmail.com.

## License
MIT License
Copyright (c) [2023] [Rezy]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgements
Special thanks to Tomas Cordero, the frontend focused engineer (Front-end repo and pet-erc20 and petTokenBalances), and David Ramirez (minter and Storageandproducts), the backend focused engineer and idea originator, for their exceptional contributions to Rezy. This Proof of Concept (PoC) project uses Thirdweb, Biconomy and Particle for blockchain related services, as well as Studio Freight template designs as well as several logos, images, videos, 3D renders and real-world references which are for visual cues and references only and do not represent any sponsorship or affiliation witth said products or brands.
