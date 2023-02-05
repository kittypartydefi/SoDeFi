

import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { Button, Card, Collapse, Divider, Input, Stats, Tabs } from "react-daisyui";

export const Filetasks = ()  => {

 return (

    <div className="stack">
    <div className="card shadow-md bg-primary text-primary-content">
        <div className="card-body">
        <h2 className="card-title">Notification 1</h2> 
        <p>You have 3 unread messages. Tap here to see.</p>
        </div>
    </div> 
    <div className="card shadow bg-primary text-primary-content">
        <div className="card-body">
        <h2 className="card-title">Notification 2</h2> 
        <p>You have 3 unread messages. Tap here to see.</p>
        </div>
    </div> 
    <div className="card shadow-sm bg-primary text-primary-content">
        <div className="card-body">
        <h2 className="card-title">Notification 3</h2> 
        <p>You have 3 unread messages. Tap here to see.</p>
        </div>
    </div>
    </div>
 )
 
}
