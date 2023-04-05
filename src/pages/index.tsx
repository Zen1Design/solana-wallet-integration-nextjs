import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import classNames from "classnames";
import { type NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const updateBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setCurrentBalance(balance);
    }
  };

  const requestAirdrop = async () => {
    if (publicKey) {
      try {
        setLoading(true);
        const airdropSignature = await connection.requestAirdrop(
          publicKey,
          LAMPORTS_PER_SOL
        );
        const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: airdropSignature,
        });
        await updateBalance();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  void updateBalance();

  return (
    <div className="flex h-full w-full justify-center">
      {!publicKey ? (
        <h1>Connect your wallet to see wallet info.</h1>
      ) : (
        <div className="card w-1/2 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Wallet Address: {publicKey?.toBase58()}
            </h2>
            <h3>Current SOL Balance: {currentBalance / LAMPORTS_PER_SOL}</h3>
            <div className="card-actions justify-end">
              <button
                onClick={() => void requestAirdrop()}
                className={classNames("btn-primary btn", { loading })}
              >
                {loading ? "Requesting..." : "Request Airdrop"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
