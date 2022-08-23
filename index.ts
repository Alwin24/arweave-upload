import Bundlr from "@bundlr-network/client";
import * as fs from "fs";
import dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;

// const bundlr = new Bundlr("https://node1.bundlr.network", "solana", privateKey); //for mainnet  
const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", privateKey, { providerUrl: "https://api.devnet.solana.com" }); //for devnet

let uploadToArweave = async () => {
    let response = await bundlr.fund(10000); //funding bundlr wallet
    console.log({response});

    let balance = await bundlr.getLoadedBalance() //getting bundlr wallet balance
    let converted = bundlr.utils.unitConverter(balance)
    console.log(converted);

    const tags = [{ name: "Content-Type", value: "text/plain" }];
    const data = fs.readFileSync("./data0.json", { encoding: "utf8" });
    let transaction = bundlr.createTransaction(data, { tags: tags });
    await transaction.sign();
    console.log((await transaction.upload()).data.id);
}

uploadToArweave()