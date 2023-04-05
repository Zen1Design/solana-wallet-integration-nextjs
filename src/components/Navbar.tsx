import dynamic from "next/dynamic";
import React from "react";

const WalletButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 px-4">
      <div className="flex-1" />

      <div className="flex-0">
        <WalletButton />
      </div>
    </div>
  );
};
