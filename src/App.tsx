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
import { BsWindowFullscreen } from "react-icons/bs";

import { useEffect, useState } from "react";
function App() {
  const appRef = useSetAppHeight();

  type Website = {
    id: number;
    value: string;
  };
  function shortenLink(link: string) {
    //return 25 characters of the link
    link = link.split("//")[1];
    if (link.includes("www.")) link = link.split("www.")[1];

    if (link.length <= 25) return link;
    return link.substring(0, 25) + "...";
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
            <div style={{ display: "block" }}>
              <BsWindowFullscreen style={{ display: "inline-block" }} />
              <Link
                href={website.value}
                target="_blank"
                style={{ display: "inline-block" }}
              >
                {shortenLink(website.value)}
              </Link>
            </div>
          );
        })}
      </Text>
    </div>
  );
}

export default App;
