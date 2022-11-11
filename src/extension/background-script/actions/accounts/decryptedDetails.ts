import { decryptData } from "~/common/lib/crypto";
import state from "~/extension/background-script/state";
import type { MessageAccountDecryptedDetails } from "~/types";

const decryptedDetails = async (message: MessageAccountDecryptedDetails) => {
  const accounts = state.getState().accounts;
  const storageSessionPassword = await chrome.storage.session.get("password");
  const password = storageSessionPassword.password;
  const accountId = message.args.id;

  if (accountId in accounts) {
    const lndHubData = decryptData(
      accounts[accountId].config as string,
      password
    );

    return {
      data: lndHubData,
    };
  } else {
    return {
      error: `Account not found: ${accountId}`,
    };
  }
};

export default decryptedDetails;
