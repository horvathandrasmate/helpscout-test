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
            <Link href={website.value} target="_blank">
              {website.value.split("//")[1]}
            </Link>
          );
        })}
      </Text>
    </div>
  );
}

export default App;
