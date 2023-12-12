import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import {
  Button,
  DefaultStyle,
  Heading,
  useSetAppHeight,
  Text,
  useHelpScoutContext,
  Link,
} from "@helpscout/ui-kit";
import { useEffect, useState } from "react";
function App() {
  const appRef = useSetAppHeight();

  
  type Website = {
    id: number;
    value: string;
  };
  function shortenLink(link:string){
    //return 25 characters of the link
    link = link.split("//")[1];
    return link.substring(0,25) + "...";
  }
  const [customerWebsites, setCustomerWebsites] = useState<
    Website[] | undefined
  >([]);

  const { user, conversation, customer } = useHelpScoutContext();
  useEffect(() => {
    setCustomerWebsites(customer?.websites);
  }, [user, conversation]);

  return (
    <div className="App" ref={appRef}>
      <DefaultStyle />

      <Text>
        {customerWebsites?.map((website) => {
          return (
            <Link href={website.value} target="_blank" style={{width:100%}}>
              {shortenLink(website.value)}
            </Link>
          );
        })}
      </Text>
    </div>
  );
}

export default App;
