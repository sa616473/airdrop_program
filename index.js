const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
} = require('@solana/web3.js')

// Creating a new wallet
const newPair = new Keypair()

//Public key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString()

//Private key
const secretKey = newPair._keypair.secretKey

console.log(newPair);

//Getting wallet balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const myWallet = await Keypair.fromSecretKey(secretKey)

    //Querying the wallet balance
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey),
    )

    console.log(`=> For wallet address ${publicKey}`)
    console.log(
      `   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`,
    )
  } catch (err) {
    console.log(err)
  }
}

//Airdrop
const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 5 SOL --`)
        const fromAirDropSignature = await connection.requestAirdrop(
            walletKeyPair.publicKey,
            1 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction();
