import { useAccount } from "wagmi";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Input,
  Stats,
  Tabs,
} from "react-daisyui";
import { useEffect, useState } from "react";
import { Fileview } from "./FileView";
import { Vote } from "./Vote";
export const Filetasks = () => {
  const [data, setData] = useState([]);
  const { address, isConnected } = useAccount()

  const fetchData = () => {
    fetch(
      `https://api.lighthouse.storage/api/user/get_uploads?publicKey=0x4Db32ee262D2F2FcA54CFA0dA5991690255B5659&pageNo=1`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Filename</th>

            <th>CID</th>
            <th>Vote</th>
            <th>Data Quality</th>
            <th>Decrypt</th>
            <th>Created At</th>
          </tr>
        </thead>

        {data.length > 0 && (
          <tbody>
            {data.map((wellnessData: any) => (
              <tr>
                <td className="text-xs">{wellnessData.fileName}</td>

                <th className="text-xs">{wellnessData.cid}</th>
                <td className="text-xs"><Vote cid={"000181e20392202034194f3b7cae3042a57b63ea4c36a962478e41bfa8ddc80dd61cae8bebdedf23"} vote={true} ></Vote></td>
                <td className="text-xs">{Math.floor(Math.random() * 10)}</td>
                <td className="text-xs">
                  <Fileview cid={wellnessData.cid}></Fileview>
                </td>
                <td className="text-xs">
                  {new Date(wellnessData.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
