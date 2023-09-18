import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { CID } from "../../../../node_modules/multiformats/src/cid";
import { Digest } from "../../../../node_modules/multiformats/src/hashes/digest.js";

function ReceiveVC() {
    const { state: { artifacts, contracts, accounts } } = useEth();

    const stringToUint8Array = async (hexString) => {
      const length = hexString.length;
      if (length % 2 !== 0) {
          throw new Error("Hex string length must be even.");
      }
  
      const uint8Array = new Uint8Array(length / 2);
  
      for (let i = 0; i < length; i += 2) {
          const byteHex = hexString.substr(i, 2);
          uint8Array[i / 2] = parseInt(byteHex, 16);
      }
  
      return uint8Array;
  }

    const readCID = async () => {

        try {
          const helia = await createHelia();
          const s = strings(helia);

          const cid = await contracts[2].methods.read(accounts[0]).call({ from: accounts[0] });

          // const multihashObj = {
          //   code: cid.multiHashCode,
          //   digest: await stringToUint8Array(cid.multiHashDigest),
          //   size: cid.multiHashSize,
          //   bytes: await stringToUint8Array(cid.multiHashBytes),
          // };
          const multihashObj = new Digest(
            cid.multiHashCode,
            await stringToUint8Array(cid.multiHashDigest),
            cid.multiHashSize,
            await stringToUint8Array(cid.multiHashBytes)
          );
          const myCID = new CID(cid.version, cid.code, multihashObj, await stringToUint8Array(cid.cidBytes));

          console.log(myCID);
          const data = await s.get(myCID);
          const blob = new Blob([data], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'encrypted_file.txt';
          link.click();
        } catch (error) {
          console.error('Error retrieving data:', error);
        } finally {
          await helia.stop();
        }
        

        await helia.stop();
    }

    return (
      <div> 
        <button onClick={readCID}>Registry</button>
      </div>
    );
  }
  
export default ReceiveVC;
